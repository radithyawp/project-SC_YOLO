
from ultralytics import YOLO

model = YOLO("runs/detect/train_v3_final/weights/best.pt")

results = model.predict(
    source="tes8.png",
    conf=0.25,
    save=True
)