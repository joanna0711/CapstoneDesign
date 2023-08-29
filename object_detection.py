import cv2
import numpy as np

# YOLO 모델 불러오기
net = cv2.dnn.readNet("C:/yolopj/yolov4.weights", "C:/yolopj/yolov4.cfg")

# COCO 데이터셋의 클래스 이름 불러오기
with open("C:/yolopj/coco.names", "r") as f:
    classes = [line.strip() for line in f.readlines()]

# YOLO 네트워크의 레이어 이름들 가져오기
layer_names = net.getLayerNames()
output_layers = [layer_names[i - 1] for i in net.getUnconnectedOutLayers().flatten()]

# 웹캠 사용하여 비디오 캡처 시작
cap = cv2.VideoCapture(0)

while True:
    ret, frame = cap.read()
    
    # 이미지 다운스케일링 (예: 원본의 0.5배 크기로 조절)
    frame = cv2.resize(frame, (int(frame.shape[1] * 0.5), int(frame.shape[0] * 0.5)))

    # YOLO 입력을 위한 이미지 전처리. 입력 크기 조절 예: (320, 320)
    blob = cv2.dnn.blobFromImage(frame, 0.00392, (320, 320), (0, 0, 0), True, crop=False)
    net.setInput(blob)

    # 객체 인식 실행
    detections = net.forward(output_layers)
    
    for detection in detections:
        for object_detection in detection:
            scores = object_detection[5:]
            class_id = np.argmax(scores)
            confidence = scores[class_id]

            # 확률 임계값 설정 (예: 0.1)
            if confidence > 0.5:
                # 바운딩 박스의 위치 정보 계산
                center_x, center_y, width, height = (object_detection[0:4] * np.array([frame.shape[1], frame.shape[0], frame.shape[1], frame.shape[0]])).astype('int')
                x = int(center_x - width / 2)
                y = int(center_y - height / 2)

                # 바운딩 박스 그리기
                cv2.rectangle(frame, (x, y), (x + width, y + height), (0, 255, 0), 2)
                
                # 바운딩 박스에 라벨 표시
                label = str(classes[class_id])
                cv2.putText(frame, label, (x, y - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)

    # 결과 출력
    cv2.imshow("Object Detection", frame)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
