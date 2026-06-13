#io digunakan untuk membuat file gambar hasil deteksi ke dalam bentuk bytes/buffer agar bisa di-download
import io

# Path digunakan untuk mengatur lokasi file model dan CSS dengan cara yang lebih aman dan rapi
from pathlib import Path

# NumPy digunakan untuk mengubah gambar menjadi array karena YOLO menerima input gambar dalam bentuk array
import numpy as np

# Pandas digunakan untuk membuat tabel ringkasan dan detail deteksi
import pandas as pd

# Streamlit digunakan untuk membuat tampilan web app
import streamlit as st

# Torch digunakan untuk mengecek apakah GPU CUDA tersedia
import torch

# PIL digunakan untuk membaca file gambar yang di-upload user
from PIL import Image

# YOLO dari Ultralytics digunakan untuk memuat model YOLOv8 dan menjalankan proses object detection
from ultralytics import YOLO

# Konfigurasi halaman, path model, path CSS, dan device
st.set_page_config(
    page_title="Building Detection AI",
    page_icon="🏢",
    layout="wide",
    initial_sidebar_state="expanded"
)

BASE_DIR = Path(__file__).resolve().parent
PROJECT_DIR = BASE_DIR.parent

MODEL_PATH = PROJECT_DIR / "models" / "best.pt"
STYLE_PATH = BASE_DIR / "style.css"
DEVICE = "cuda" if torch.cuda.is_available() else "cpu"

# Daftar kelas dan mapping nama agar tampilan konsisten
ORDERED_CLASSES = ["Home", "Oil Refinery", "Solar Panels", "Mosque"]

DISPLAY_NAMES = {
    "Home": "Home",
    "Oil Rafinery": "Oil Refinery",
    "Oil Refinery": "Oil Refinery",
    "Solar Panels": "Solar Panels",
    "mosque": "Mosque",
    "Mosque": "Mosque",
}

# Memuat CSS eksternal untuk tampilan aplikasi
def load_css():
    if STYLE_PATH.exists():
        st.markdown(f"<style>{STYLE_PATH.read_text(encoding='utf-8')}</style>", unsafe_allow_html=True)
    else:
        st.warning(f"CSS file not found: {STYLE_PATH}")

# Memuat model YOLOv8n hasil training
@st.cache_resource(show_spinner=False)
def load_model():
    if not MODEL_PATH.exists():
        st.error("Model tidak ditemukan. Pastikan file best.pt ada di folder: models/best.pt")
        st.stop()

    return YOLO(str(MODEL_PATH))

load_css()
model = load_model()
MODEL_NAMES = model.names

# Menyamakan nama kelas dari model ke nama tampilan
def normalize_class_name(raw_name: str) -> str:
    return DISPLAY_NAMES.get(raw_name, raw_name)

# Mengubah gambar hasil deteksi menjadi bytes untuk download
def image_to_buffer(image_array: np.ndarray) -> bytes:
    image = Image.fromarray(image_array)
    buffer = io.BytesIO()
    image.save(buffer, format="PNG")
    return buffer.getvalue()

# Menjalankan prediksi YOLOv8 pada gambar input
def run_prediction(image_np: np.ndarray, confidence: float):
    results = model.predict(
        source=image_np,
        conf=confidence,
        imgsz=640,
        device=0 if DEVICE == "cuda" else "cpu",
        verbose=False
    )

    return results[0]

# Membaca hasil prediksi, menghitung objek per kelas, dan menyimpan detail deteksi
def parse_detection_result(result):
    counts = {class_name: 0 for class_name in ORDERED_CLASSES}
    detection_rows = []

    for idx, box in enumerate(result.boxes, start=1):
        class_id = int(box.cls[0])
        raw_class_name = MODEL_NAMES[class_id]
        class_name = normalize_class_name(raw_class_name)

        confidence_score = float(box.conf[0])
        x1, y1, x2, y2 = box.xyxy[0].tolist()

        if class_name in counts:
            counts[class_name] += 1

        detection_rows.append({
            "No": idx,
            "Class": class_name,
            "Confidence": round(confidence_score, 3),
            "X1": int(x1),
            "Y1": int(y1),
            "X2": int(x2),
            "Y2": int(y2),
        })

    return counts, detection_rows

# Memproses satu gambar: prediksi, counting, dan visualisasi
def process_uploaded_file(uploaded_file, confidence: float):
    image = Image.open(uploaded_file).convert("RGB")
    image_np = np.array(image)

    result = run_prediction(image_np, confidence)
    annotated_rgb = result.plot()

    counts, detection_rows = parse_detection_result(result)
    total_detected = sum(counts.values())

    return image_np, annotated_rgb, counts, detection_rows, total_detected


# Memproses banyak gambar untuk mode multiple image / folder
def process_batch_files(uploaded_files, confidence: float):
    summary_rows = []
    detail_rows = []
    results_cache = {}

    progress = st.progress(0, text="Processing images...")

    for idx, uploaded_file in enumerate(uploaded_files, start=1):
        try:
            image_np, annotated_rgb, counts, detection_rows, total_detected = process_uploaded_file(
                uploaded_file,
                confidence
            )

            summary_rows.append({
                "No": idx,
                "Filename": uploaded_file.name,
                "Status": "Success",
                "Total": total_detected,
                "Home": counts["Home"],
                "Oil Refinery": counts["Oil Refinery"],
                "Solar Panels": counts["Solar Panels"],
                "Mosque": counts["Mosque"],
            })

            for row in detection_rows:
                detail_rows.append({
                    "Filename": uploaded_file.name,
                    **row
                })

            results_cache[uploaded_file.name] = {
                "image_np": image_np,
                "annotated_rgb": annotated_rgb,
                "counts": counts,
                "detection_rows": detection_rows,
                "total_detected": total_detected,
            }

        except Exception as error:
            summary_rows.append({
                "No": idx,
                "Filename": uploaded_file.name,
                "Status": f"Error: {error}",
                "Total": 0,
                "Home": 0,
                "Oil Refinery": 0,
                "Solar Panels": 0,
                "Mosque": 0,
            })

        progress.progress(idx / len(uploaded_files), text=f"Processing {idx}/{len(uploaded_files)} images...")

    progress.empty()

    summary_df = pd.DataFrame(summary_rows)
    detail_df = pd.DataFrame(detail_rows)

    return summary_df, detail_df, results_cache

# Menampilkan sidebar informasi project
def render_sidebar():
    with st.sidebar:
        st.markdown('<div class="sidebar-header">Project Information</div>', unsafe_allow_html=True)

        st.markdown("""
            <div class="sidebar-card">
                <div class="sidebar-card-label">Architecture</div>
                <div class="sidebar-card-value">YOLOv8n Object Detection</div>
            </div>
            <div class="sidebar-card">
                <div class="sidebar-card-label">Dataset</div>
                <div class="sidebar-card-value">Custom Google Earth / Satellite Dataset</div>
            </div>
            <div class="sidebar-card">
                <div class="sidebar-card-label">Classes</div>
                <ul class="sidebar-feature-list">
                    <li><i class="bi bi-house"></i> Home</li>
                    <li><i class="bi bi-moon-stars"></i> Mosque</li>
                    <li><i class="bi bi-fuel-pump"></i> Oil Refinery</li>
                    <li><i class="bi bi-sun"></i> Solar Panels</li>
                </ul>
            </div>
            <div class="sidebar-card">
                <div class="sidebar-card-label">Features</div>
                <ul class="sidebar-feature-list">
                    <li><i class="bi bi-bounding-box"></i> Bounding Box Detection</li>
                    <li><i class="bi bi-123"></i> Automatic Object Counting</li>
                    <li><i class="bi bi-cloud-arrow-up"></i> Drag & Drop Upload</li>
                </ul>
            </div>
        """, unsafe_allow_html=True)

        st.markdown("---")

        if DEVICE == "cuda":
            badge = '<div class="status-badge"><i class="bi bi-lightning-charge-fill"></i> GPU Accelerated</div>'
        else:
            badge = '<div class="status-badge" style="background:#eff6ff;color:#2563eb;border-color:#bfdbfe;"><i class="bi bi-cpu"></i> CPU Mode</div>'

        st.markdown(badge, unsafe_allow_html=True)
        st.markdown("---")
        st.caption("v1.0 • YOLOv8 Building Detection AI")

# Menampilkan header utama aplikasi
def render_header():
    st.markdown("""
        <div class="main-header">
            <h1><i class="bi bi-buildings"></i> Automated Building Detection</h1>
            <p>YOLOv8-powered satellite imagery object detection for Home, Mosque, Oil Refinery, and Solar Panels</p>
        </div>
    """, unsafe_allow_html=True)

# Membuat judul section
def render_section(title: str, icon: str):
    st.markdown(f"""
        <div class="section-header">
            <i class="bi {icon}"></i> {title}
        </div>
    """, unsafe_allow_html=True)

# Menampilkan jumlah objek per kelas
def render_metrics(counts: dict):
    render_section("Detection Results", "bi-bar-chart-line")

    cols = st.columns(4)

    for col, class_name in zip(cols, ORDERED_CLASSES):
        with col:
            st.metric(class_name, counts[class_name])

# Menampilkan gambar asli, hasil deteksi, dan tabel summary/detail
def render_tabs(image_np, annotated_rgb, counts, detection_rows, total_detected):
    render_section("Visualization Results", "bi-images")

    tab1, tab2, tab3 = st.tabs(["Original Image", "Detection Result", "Detection Summary"])

    with tab1:
        st.image(image_np, caption="Original Satellite Image", width="stretch")

    with tab2:
        st.image(
            annotated_rgb,
            caption=f"Detected {total_detected} object(s)",
            width="stretch"
        )

    with tab3:
        summary_df = pd.DataFrame({
            "Class": ORDERED_CLASSES,
            "Count": [counts[class_name] for class_name in ORDERED_CLASSES]
        })

        st.subheader("Object Count Summary")
        st.dataframe(summary_df, width="stretch", hide_index=True)

        if detection_rows:
            st.subheader("Detection Detail")
            detail_df = pd.DataFrame(detection_rows)
            st.dataframe(detail_df, width="stretch", hide_index=True)
        else:
            st.info("Tidak ada objek yang terdeteksi pada confidence threshold ini.")

# Menampilkan banner sukses setelah deteksi selesai
def render_success_banner(total_detected: int):
    st.markdown(f"""
        <div class="success-banner">
            <i class="bi bi-check-circle-fill"></i>
            Detection completed successfully! Detected <strong>{total_detected}</strong> object(s).
        </div>
    """, unsafe_allow_html=True)

# Alur utama aplikasi
render_sidebar()
render_header()

render_section("Upload Satellite Image", "bi-satellite")

# Pilihan mode upload
upload_mode = st.radio(
    "Upload Mode",
    ["Multiple Images", "Folder"],
    horizontal=True,
    help="Multiple Images untuk upload beberapa gambar. Folder untuk upload satu folder berisi banyak gambar."
)

accept_mode = "directory" if upload_mode == "Folder" else True

# Upload banyak gambar atau folder
uploaded_files = st.file_uploader(
    "Drop your satellite images here or click to browse",
    type=["png", "jpg", "jpeg", "tif", "tiff"],
    accept_multiple_files=accept_mode,
    help="Supported formats: PNG, JPG, JPEG, TIF, TIFF"
)

# Berhenti jika belum ada file
if not uploaded_files:
    st.info("Upload gambar satelit atau folder berisi gambar untuk memulai deteksi.")
    st.stop()

# Slider confidence threshold
confidence = st.slider(
    "Confidence Threshold",
    min_value=0.10,
    max_value=0.90,
    value=0.25,
    step=0.05,
    help="Naikkan jika terlalu banyak false detection. Turunkan jika objek banyak yang tidak terdeteksi."
)

# Proses semua file
with st.spinner("Detecting objects with YOLOv8..."):
    summary_df, detail_df, results_cache = process_batch_files(uploaded_files, confidence)

st.markdown("---")

# Mode folder: output tabel saja
if upload_mode == "Folder":
    total_counts = {
        "Home": int(summary_df["Home"].sum()),
        "Oil Refinery": int(summary_df["Oil Refinery"].sum()),
        "Solar Panels": int(summary_df["Solar Panels"].sum()),
        "Mosque": int(summary_df["Mosque"].sum()),
    }

    render_metrics(total_counts)

    st.markdown("---")
    render_section("Folder Detection Summary", "bi-folder")

    st.subheader("Object Count Summary per Image")
    st.dataframe(summary_df, width="stretch", hide_index=True)

    if not detail_df.empty:
        st.subheader("Detection Detail")
        st.dataframe(detail_df, width="stretch", hide_index=True)
    else:
        st.info("Tidak ada objek yang terdeteksi pada folder ini.")

    st.download_button(
        label="⬇ Download Summary CSV",
        data=summary_df.to_csv(index=False).encode("utf-8"),
        file_name="folder_detection_summary.csv",
        mime="text/csv",
        width="stretch"
    )

    if not detail_df.empty:
        st.download_button(
            label="⬇ Download Detection Detail CSV",
            data=detail_df.to_csv(index=False).encode("utf-8"),
            file_name="folder_detection_detail.csv",
            mime="text/csv",
            width="stretch"
        )

# Mode multiple images: bisa pilih salah satu gambar untuk divisualisasikan
else:
    filenames = list(results_cache.keys())

    selected_filename = st.selectbox(
        "Select image to preview",
        filenames
    )

    selected_result = results_cache[selected_filename]

    render_metrics(selected_result["counts"])

    st.markdown("---")
    render_tabs(
        selected_result["image_np"],
        selected_result["annotated_rgb"],
        selected_result["counts"],
        selected_result["detection_rows"],
        selected_result["total_detected"]
    )

    render_success_banner(selected_result["total_detected"])

    st.download_button(
        label="⬇ Download Selected Detection Result",
        data=image_to_buffer(selected_result["annotated_rgb"]),
        file_name=f"{Path(selected_filename).stem}_detection_result.png",
        mime="image/png",
        width="stretch"
    )

    st.markdown("---")
    render_section("Batch Detection Summary", "bi-table")

    st.subheader("Object Count Summary per Image")
    st.dataframe(summary_df, width="stretch", hide_index=True)

    if not detail_df.empty:
        st.subheader("Detection Detail")
        st.dataframe(detail_df, width="stretch", hide_index=True)

    st.download_button(
        label="⬇ Download Batch Summary CSV",
        data=summary_df.to_csv(index=False).encode("utf-8"),
        file_name="batch_detection_summary.csv",
        mime="text/csv",
        width="stretch"
    )