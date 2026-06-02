import io
import streamlit as st
import torch
import cv2
import numpy as np
import pandas as pd
from PIL import Image
from ultralytics import YOLO

# Konfigurasi Page
st.set_page_config(
    page_title="Building Detection AI",
    page_icon="🏢",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Custom CSS (Pakai bootstrap via CDN)
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

        .stProgress > div > div {
            background: linear-gradient(90deg, #667eea, #764ba2) !important;
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

        div[data-testid="stDownloadButton"] {
            margin-top: 2rem;
        }
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
from ultralytics import YOLO
import pandas as pd

DEVICE = "cuda" if torch.cuda.is_available() else "cpu"
MODEL_PATH = "models/best.pt"

@st.cache_resource(show_spinner=False)
def load_model():
    return YOLO(MODEL_PATH)

model = load_model()

# Sidebar
with st.sidebar:
    st.markdown('<div class="sidebar-header">Project Information</div>', unsafe_allow_html=True)

    st.markdown("""
        <div class="sidebar-card">
            <div class="sidebar-card-label">Architecture</div>
            <div class="sidebar-card-value">U-Net + ResNet34 Encoder</div>
        </div>
        <div class="sidebar-card">
            <div class="sidebar-card-label">Dataset</div>
            <div class="sidebar-card-value">WHU Building Dataset</div>
        </div>
        <div class="sidebar-card">
            <div class="sidebar-card-label">Features</div>
            <ul class="sidebar-feature-list">
                <li><i class="bi bi-layers"></i> Building Segmentation</li>
                <li><i class="bi bi-123"></i> Automatic Counting</li>
                <li><i class="bi bi-bounding-box"></i> Bounding Box Detection</li>
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
    st.caption("v1.0 • Building Detection AI")

# Main Header
st.markdown("""
    <div class="main-header">
        <h1><i class="bi bi-buildings"></i> Automated Building Detection</h1>
        <p>Deep Learning-powered satellite imagery analysis using U-Net architecture</p>
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
    type=["png", "jpg", "jpeg", "tif"],
    help="Supported formats: PNG, JPG, JPEG, TIF"
)

# Processing
if uploaded_file is not None:
    image = Image.open(uploaded_file).convert("RGB")
    image_np = np.array(image)

    with st.spinner("Detecting objects with YOLOv8..."):
        results = model.predict(
            source=image_np,
            conf=0.25,
            imgsz=640,
            device=0 if DEVICE == "cuda" else "cpu"
        )

    result = results[0]
    annotated_image = result.plot()

    counts = {
        "Home": 0,
        "Oil Rafinery": 0,
        "Solar Panels": 0,
        "mosque": 0
    }

    for box in result.boxes:
        class_id = int(box.cls[0])
        class_name = model.names[class_id]

        if class_name in counts:
            counts[class_name] += 1

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
        st.metric("Oil Refinery", counts["Oil Rafinery"])
    with col3:
        st.metric("Solar Panels", counts["Solar Panels"])
    with col4:
        st.metric("Mosque", counts["mosque"])

    st.markdown("---")

    st.markdown("""
        <div class="section-header">
            <i class="bi bi-images"></i> Visualization Results
        </div>
    """, unsafe_allow_html=True)

    tab1, tab2, tab3 = st.tabs(["Original Image", "Detection Result", "Summary"])

    with tab1:
        st.image(image_np, caption="Original Image", width="stretch")

    with tab2:
        st.image(annotated_image, caption=f"Detected {total_detected} objects", width="stretch")

    with tab3:
        summary_df = pd.DataFrame({
            "Class": ["Home", "Oil Refinery", "Solar Panels", "Mosque"],
            "Count": [
                counts["Home"],
                counts["Oil Rafinery"],
                counts["Solar Panels"],
                counts["mosque"]
            ]
        })
        st.dataframe(summary_df, width="stretch")

    st.markdown(f"""
        <div class="success-banner">
            <i class="bi bi-check-circle-fill"></i>
            Detection completed successfully! Detected <strong>{total_detected}</strong> object(s).
        </div>
    """, unsafe_allow_html=True)

    result_pil = Image.fromarray(annotated_image)
    buf = io.BytesIO()
    result_pil.save(buf, format="PNG")

    st.download_button(
        label="⬇ Download Detection Result",
        data=buf.getvalue(),
        file_name="yolov8_detection_result.png",
        mime="image/png",
        width="stretch"
    )

    # Metrics
    st.markdown("""
        <div class="section-header">
            <i class="bi bi-bar-chart-line"></i> Analysis Results
        </div>
    """, unsafe_allow_html=True)

    col1, col2, col3, col4 = st.columns(4)

    with col1:
        st.metric("Home", counts["Home"])

    with col2:
        st.metric("Mosque", counts["Mosque"])

    with col3:
        st.metric("Oil Refinery", counts["Oil Refinery"])

    with col4:
        st.metric("Solar Panels", counts["Solar Panels"])

    st.markdown("---")

    # Visualization
    st.markdown("""
        <div class="section-header">
            <i class="bi bi-images"></i> Visualization Results
        </div>
    """, unsafe_allow_html=True)

    tab1, tab2, tab3 = st.tabs(["Original Image", "Detection Result", "Detection Summary"])

    with tab1:
        st.image(image_np, caption="Original Satellite Image", use_container_width=True)

    with tab2:
        mask_colored = np.zeros((*binary_mask.shape, 3), dtype=np.uint8)
        mask_colored[binary_mask == 1] = [102, 126, 234]
        st.image(mask_colored, caption="AI Predicted Segmentation Mask", use_container_width=True)

    with tab3:
        st.image(output_image,
                 caption=f"Detected {building_count} Buildings with Bounding Boxes",
                 use_container_width=True)

    # Success Banner
    st.markdown(f"""
        <div class="success-banner">
            <i class="bi bi-check-circle-fill"></i>
            Analysis completed successfully! Detected <strong>{building_count}</strong>
            building{'s' if building_count != 1 else ''} in the satellite image.
        </div>
    """, unsafe_allow_html=True)

    # Download
    if building_count > 0:
        result_pil = Image.fromarray(output_image)
        buf = io.BytesIO()
        result_pil.save(buf, format="PNG")

        st.download_button(
            label="⬇  Download Detection Result",
            data=buf.getvalue(),
            file_name="building_detection_result.png",
            mime="image/png",
            use_container_width=True
        )