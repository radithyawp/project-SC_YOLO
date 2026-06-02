from ultralytics import YOLO

if __name__ == "__main__":
    model = YOLO("yolov8n.pt")

    model.train(
        data="dataset/data.yaml",
        epochs=100,
        imgsz=640,
        batch=8,
        workers=0,
        patience=20,
        device=0,
        name="train_v3_final"
    )