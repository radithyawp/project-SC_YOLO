# Multi-Class Building Detection Using YOLOv8 and Streamlit

Project ini merupakan sistem deteksi objek multi-class pada citra satelit menggunakan YOLOv8. Model dilatih untuk mendeteksi empat kelas objek, yaitu:

- Home
- Mosque
- Oil Refinery
- Solar Panels

Sistem juga dilengkapi dengan web application berbasis Streamlit agar pengguna dapat melakukan upload gambar secara drag & drop dan melihat hasil deteksi secara langsung.

## Features

- Multi-class object detection menggunakan YOLOv8
- Deteksi objek dengan bounding box
- Perhitungan jumlah objek per kelas
- Confidence threshold slider
- Upload gambar melalui Streamlit
- Download hasil deteksi dalam format gambar
- GPU acceleration dengan CUDA jika tersedia

## Project Structure

```text
building_detection/
├── dataset/
│   ├── train/
│   ├── valid/
│   ├── test/
│   └── data.yaml
├── models/
│   └── best.pt
├── runs/
│   └── detect/
├── src/
│   └── app.py
├── training.py
├── requirements.txt
├── README.md
└── .gitignore