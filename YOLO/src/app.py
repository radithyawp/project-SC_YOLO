import io
from pathlib import Path

import numpy as np
import pandas as pd
import streamlit as st
import torch
from PIL import Image
from ultralytics import YOLO

# CONFIG
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

ORDERED_CLASSES = ["Home", "Oil Refinery", "Solar Panels", "Mosque"]

DISPLAY_NAMES = {
    "Home": "Home",
    "Oil Rafinery": "Oil Refinery",
    "Oil Refinery": "Oil Refinery",
    "Solar Panels": "Solar Panels",
    "mosque": "Mosque",
    "Mosque": "Mosque",
}

# LOADERS
def load_css():
    if STYLE_PATH.exists():
        st.markdown(f"<style>{STYLE_PATH.read_text(encoding='utf-8')}</style>", unsafe_allow_html=True)
    else:
        st.warning(f"CSS file not found: {STYLE_PATH}")

@st.cache_resource(show_spinner=False)
def load_model():
    if not MODEL_PATH.exists():
        st.error("Model tidak ditemukan. Pastikan file best.pt ada di folder: models/best.pt")
        st.stop()

    return YOLO(str(MODEL_PATH))

load_css()
model = load_model()
MODEL_NAMES = model.names

# HELPER FUNCTIONS
def normalize_class_name(raw_name: str) -> str:
    return DISPLAY_NAMES.get(raw_name, raw_name)

def image_to_buffer(image_array: np.ndarray) -> bytes:
    image = Image.fromarray(image_array)
    buffer = io.BytesIO()
    image.save(buffer, format="PNG")
    return buffer.getvalue()

def run_prediction(image_np: np.ndarray, confidence: float):
    results = model.predict(
        source=image_np,
        conf=confidence,
        imgsz=640,
        device=0 if DEVICE == "cuda" else "cpu",
        verbose=False
    )

    return results[0]

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

# UI COMPONENTS
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

def render_header():
    st.markdown("""
        <div class="main-header">
            <h1><i class="bi bi-buildings"></i> Automated Building Detection</h1>
            <p>YOLOv8-powered satellite imagery object detection for Home, Mosque, Oil Refinery, and Solar Panels</p>
        </div>
    """, unsafe_allow_html=True)

def render_section(title: str, icon: str):
    st.markdown(f"""
        <div class="section-header">
            <i class="bi {icon}"></i> {title}
        </div>
    """, unsafe_allow_html=True)

def render_metrics(counts: dict):
    render_section("Detection Results", "bi-bar-chart-line")

    cols = st.columns(4)

    for col, class_name in zip(cols, ORDERED_CLASSES):
        with col:
            st.metric(class_name, counts[class_name])


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


def render_success_banner(total_detected: int):
    st.markdown(f"""
        <div class="success-banner">
            <i class="bi bi-check-circle-fill"></i>
            Detection completed successfully! Detected <strong>{total_detected}</strong> object(s).
        </div>
    """, unsafe_allow_html=True)

# MAIN APP
render_sidebar()
render_header()

render_section("Upload Satellite Image", "bi-satellite")

uploaded_file = st.file_uploader(
    "Drop your satellite image here or click to browse",
    type=["png", "jpg", "jpeg", "tif", "tiff"],
    help="Supported formats: PNG, JPG, JPEG, TIF, TIFF"
)

if uploaded_file is None:
    st.info("Upload gambar satelit atau screenshot Google Earth untuk memulai deteksi.")
    st.stop()

image = Image.open(uploaded_file).convert("RGB")
image_np = np.array(image)

confidence = st.slider(
    "Confidence Threshold",
    min_value=0.10,
    max_value=0.90,
    value=0.25,
    step=0.05,
    help="Naikkan jika terlalu banyak false detection. Turunkan jika objek banyak yang tidak terdeteksi."
)

with st.spinner("Detecting objects with YOLOv8..."):
    result = run_prediction(image_np, confidence)

annotated_rgb = result.plot()[..., ::-1]

counts, detection_rows = parse_detection_result(result)
total_detected = sum(counts.values())

st.markdown("---")
render_metrics(counts)

st.markdown("---")
render_tabs(image_np, annotated_rgb, counts, detection_rows, total_detected)

render_success_banner(total_detected)

st.download_button(
    label="⬇ Download Detection Result",
    data=image_to_buffer(annotated_rgb),
    file_name="yolov8_detection_result.png",
    mime="image/png",
    width="stretch"
)