# 기본 프레임
from tkinter import *   # tkinter 모듈 안의 모든 것을 쓸 수 있게 됨.

root = Tk() # Tk 함수 통해 윈도우 창 만들 수 있게 된다. default title: tk
root.title("reem")  # title 변경
#root.geometry("400x600")  # 크기 설정.가로x세로. 따옴표 안에 작성할 것.
root.geometry("400x600+400+0") # "가로x세로+x좌표+y좌표"

root.resizable(True, False) # x(너비. 가로), y(높이. 세로). False의 경우 사이즈 조정 불가. 파이썬에선 true, false 대문자로 시작하게 적기.

root.mainloop() # 윈도우가 종료될 때까지 창을 실행시킴. -> 실행흐름 맨 마지막에 작성.