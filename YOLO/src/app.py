import io
from pathlib import Path

import cv2
import numpy as np
import pandas as pd
import streamlit as st
import torch
from PIL import Image
from ultralytics import YOLO

# Page Configuration
st.set_page_config(
    page_title="Building Detection AI",
    page_icon="🏢",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Custom CSS
st.markdown("""
    <style>
        @import url('https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css');
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

        html, body, [class*="css"] {
            font-family: 'Inter', sans-serif;
        }

        .main-header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 2.5rem 2rem;
            border-radius: 16px;
            margin-bottom: 2rem;
            color: white;
            text-align: center;
            box-shadow: 0 10px 40px rgba(102, 126, 234, 0.3);
        }
        .main-header h1 {
            font-size: 2.5rem;
            font-weight: 700;
            margin-bottom: 0.5rem;
            letter-spacing: -0.02em;
        }
        .main-header p {
            font-size: 1.1rem;
            opacity: 0.9;
            margin: 0;
            font-weight: 300;
        }

        .section-header {
            display: flex;
            align-items: center;
            gap: 0.6rem;
            font-size: 1.3rem;
            font-weight: 600;
            color: #667eea;
            margin-bottom: 1rem;
        }
        .section-header i {
            color: #667eea;
            font-size: 1.4rem;
        }

        .sidebar-header {
            font-size: 1rem;
            font-weight: 700;
            color: #667eea;
            margin-bottom: 1.2rem;
            padding-bottom: 0.6rem;
            border-bottom: 2px solid #667eea;
            letter-spacing: 0.02em;
            text-transform: uppercase;
        }
        .sidebar-card {
            background: #f9fafb;
            border: 1px solid #e5e7eb;
            border-radius: 10px;
            padding: 0.85rem 1rem;
            margin-bottom: 0.7rem;
        }
        .sidebar-card-label {
            font-size: 0.7rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            color: #9ca3af;
            margin-bottom: 0.25rem;
        }
        .sidebar-card-value {
            font-size: 0.9rem;
            font-weight: 500;
            color: #1f2937;
        }
        .sidebar-feature-list {
            list-style: none;
            padding: 0;
            margin: 0;
        }
        .sidebar-feature-list li {
            font-size: 0.85rem;
            color: #374151;
            padding: 0.25rem 0;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        .sidebar-feature-list li i {
            color: #667eea;
            font-size: 0.85rem;
        }
        .status-badge {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            background: #ecfdf5;
            color: #059669;
            padding: 0.45rem 1rem;
            border-radius: 9999px;
            font-size: 0.82rem;
            font-weight: 600;
            border: 1px solid #a7f3d0;
        }
        .status-badge i {
            font-size: 0.9rem;
        }

        div[data-testid="stFileUploader"] { width: 100%; }
        div[data-testid="stFileUploader"] > section {
            background: linear-gradient(135deg, rgba(102,126,234,0.05) 0%, rgba(118,75,162,0.05) 100%);
            border: 2px dashed #667eea;
            border-radius: 16px;
            padding: 2rem;
            transition: all 0.3s ease;
        }
        div[data-testid="stFileUploader"] > section:hover {
            border-color: #764ba2;
            background: linear-gradient(135deg, rgba(102,126,234,0.1) 0%, rgba(118,75,162,0.1) 100%);
        }
        div[data-testid="stFileUploader"] button {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            border-radius: 8px;
            padding: 0.5rem 1.5rem;
            font-weight: 500;
        }

        .stTabs [data-baseweb="tab-list"] { gap: 8px; }
        .stTabs [data-baseweb="tab"] {
            background: rgba(102, 126, 234, 0.08);
            border-radius: 8px 8px 0 0;
            padding: 10px 20px;
            transition: all 0.2s ease;
            font-weight: 500;
            color: #667eea;
        }
        .stTabs [data-baseweb="tab"]:hover {
            background: rgba(102, 126, 234, 0.2);
            color: #667eea;
        }
        .stTabs [aria-selected="true"] {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
            color: white !important;
        }

        div[data-testid="stMetricValue"] {
            font-size: 2rem !important;
            font-weight: 700 !important;
            color: #667eea !important;
        }
        div[data-testid="stMetricLabel"] {
            font-size: 0.78rem !important;
            text-transform: uppercase !important;
            letter-spacing: 0.05em !important;
        }

        .success-banner {
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 12px;
            text-align: center;
            font-weight: 500;
            margin-top: 1.5rem;
            box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.6rem;
            font-size: 1rem;
        }
        .success-banner i { font-size: 1.2rem; }

        div[data-testid="stDownloadButton"] { margin-top: 2rem; }
        div[data-testid="stDownloadButton"] button {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            border-radius: 12px;
            padding: 0.75rem 2rem;
            font-weight: 600;
            width: 100%;
            transition: all 0.2s ease;
        }
        div[data-testid="stDownloadButton"] button:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
        }
    </style>
""", unsafe_allow_html=True)

# Device & Model Setup
DEVICE = "cuda" if torch.cuda.is_available() else "cpu"
MODEL_PATH = Path("models/best.pt")


@st.cache_resource(show_spinner=False)
def load_model():
    if not MODEL_PATH.exists():
        st.error(
            "Model tidak ditemukan. Pastikan file best.pt sudah ada di folder: models/best.pt"
        )
        st.stop()
    return YOLO(str(MODEL_PATH))


model = load_model()

# Ambil nama kelas asli dari model YOLO
MODEL_NAMES = model.names

# Mapping nama kelas dari model ke nama tampilan UI
DISPLAY_NAMES = {
    "Home": "Home",
    "Oil Rafinery": "Oil Refinery",
    "Solar Panels": "Solar Panels",
    "mosque": "Mosque",
    "Mosque": "Mosque",
    "Oil Refinery": "Oil Refinery",
}

ORDERED_CLASSES = ["Home", "Oil Refinery", "Solar Panels", "Mosque"]

# Sidebar
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
        st.markdown(
            '<div class="status-badge"><i class="bi bi-lightning-charge-fill"></i> GPU Accelerated</div>',
            unsafe_allow_html=True
        )
    else:
        st.markdown(
            '<div class="status-badge" style="background:#eff6ff;color:#2563eb;border-color:#bfdbfe;"><i class="bi bi-cpu"></i> CPU Mode</div>',
            unsafe_allow_html=True
        )

    st.markdown("---")
    st.caption("v1.0 • YOLOv8 Building Detection AI")

# Main Header
st.markdown("""
    <div class="main-header">
        <h1><i class="bi bi-buildings"></i> Automated Building Detection</h1>
        <p>YOLOv8-powered satellite imagery object detection for Home, Mosque, Oil Refinery, and Solar Panels</p>
    </div>
""", unsafe_allow_html=True)

# Upload Section
st.markdown("""
    <div class="section-header">
        <i class="bi bi-satellite"></i> Upload Satellite Image
    </div>
""", unsafe_allow_html=True)

uploaded_file = st.file_uploader(
    "Drop your satellite image here or click to browse",
    type=["png", "jpg", "jpeg", "tif", "tiff"],
    help="Supported formats: PNG, JPG, JPEG, TIF, TIFF"
)

# Processing
if uploaded_file is not None:
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
        results = model.predict(
            source=image_np,
            conf=confidence,
            imgsz=640,
            device=0 if DEVICE == "cuda" else "cpu",
            verbose=False
        )

    result = results[0]

    annotated_bgr = result.plot()
    annotated_rgb = cv2.cvtColor(annotated_bgr, cv2.COLOR_BGR2RGB)

    counts = {class_name: 0 for class_name in ORDERED_CLASSES}

    detection_rows = []

    for idx, box in enumerate(result.boxes, start=1):
        class_id = int(box.cls[0])
        raw_class_name = MODEL_NAMES[class_id]
        display_class_name = DISPLAY_NAMES.get(raw_class_name, raw_class_name)

        confidence_score = float(box.conf[0])
        x1, y1, x2, y2 = box.xyxy[0].tolist()

        if display_class_name in counts:
            counts[display_class_name] += 1

        detection_rows.append({
            "No": idx,
            "Class": display_class_name,
            "Confidence": round(confidence_score, 3),
            "X1": int(x1),
            "Y1": int(y1),
            "X2": int(x2),
            "Y2": int(y2),
        })

    total_detected = sum(counts.values())

    st.markdown("---")

    st.markdown("""
        <div class="section-header">
            <i class="bi bi-bar-chart-line"></i> Detection Results
        </div>
    """, unsafe_allow_html=True)

    col1, col2, col3, col4 = st.columns(4)

    with col1:
        st.metric("Home", counts["Home"])
    with col2:
        st.metric("Oil Refinery", counts["Oil Refinery"])
    with col3:
        st.metric("Solar Panels", counts["Solar Panels"])
    with col4:
        st.metric("Mosque", counts["Mosque"])

    st.markdown("---")

    st.markdown("""
        <div class="section-header">
            <i class="bi bi-images"></i> Visualization Results
        </div>
    """, unsafe_allow_html=True)

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

    st.markdown(f"""
        <div class="success-banner">
            <i class="bi bi-check-circle-fill"></i>
            Detection completed successfully! Detected <strong>{total_detected}</strong> object(s).
        </div>
    """, unsafe_allow_html=True)

    result_pil = Image.fromarray(annotated_rgb)
    buf = io.BytesIO()
    result_pil.save(buf, format="PNG")

    st.download_button(
        label="⬇ Download Detection Result",
        data=buf.getvalue(),
        file_name="yolov8_detection_result.png",
        mime="image/png",
        width="stretch"
    )

else:
    st.info("Upload gambar satelit atau screenshot Google Earth untuk memulai deteksi.")
