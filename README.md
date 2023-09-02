1. 가상 환경 준비
Python에서는 프로젝트별로 독립적인 환경을 만들어 주는 가상 환경이 유용합니다. 이를 통해 프로젝트마다 다른 라이브러리 버전을 사용할 수 있습니다.

1.1. 가상 환경을 생성합니다: cmd에서 실행.
python -m venv myflaskenv

이렇게 하면 현재 디렉토리에 myflaskenv라는 폴더가 생성됩니다.

1.2. 가상 환경을 활성화합니다: cmd에서 실행.
Windows: myflaskenv\Scripts\activate
macOS/Linux: source myflaskenv/bin/activate

2. Flask 및 필요 라이브러리 설치
가상 환경이 활성화된 상태에서 다음 명령을 실행하여 Flask 및 필요한 라이브러리를 설치합니다: cmd에서 실행.
pip install flask


4. Flask 애플리케이션 작성
3.1. 새로운 파이썬 파일을 만듭니다. 예를 들어, app.py라는 이름으로 파일을 생성합니다.
파일들의 각 위치는 아래와 같아야함.
C:\Users\shininjae
|-- myflaskenv\
|   |-- include\
|   |-- lib\
|   |-- Scripts\
|-- app.py

3.2. 위에서 제시한 Flask 코드를 app.py에 복사 및 붙여넣기 합니다: python에서 실행.
from flask import Flask, jsonify, request
app = Flask(__name__)
@app.route('/api/greet', methods=['POST'])
def greet():
    data = request.json
    name = data.get('name', 'Guest')
    return jsonify(message=f"Hello, {name}!")
if __name__ == '__main__':
    app.run(port=5000)

4. Flask 애플리케이션 실행
터미널이나 명령 프롬프트에서 다음 명령을 실행하여 Flask 애플리케이션을 시작합니다: cmd에서 실행
python app.py

이후, 브라우저에서 http://localhost:5000/ 주소로 접속하면 Flask 앱이 정상적으로 동작하는 것을 확인할 수 있습니다.
단, 위의 예제에서는 /api/greet 경로에 POST 요청을 해야 JSON 응답을 받을 수 있으므로, 브라우저에서 직접 접근하는 것이 아니라, Postman과 같은 도구 또는 React 프론트엔드를 사용하여 요청을 보내야 합니다.
이렇게 해서 Flask 백엔드의 기본적인 준비가 완료



다음은 react로 GUI가 조성되어있다는 가정 하에 프론트 환경 조성 과정.
1. React 프로젝트 시작하기
React 프로젝트를 시작하기 가장 간단한 방법은 Create React App(CRA)을 사용하는 것입니다. CRA는 React 기반의 싱글 페이지 애플리케이션을 빠르게 시작할 수 있게 도와줍니다.: cmd에서 실행.
npx create-react-app myreactapp
cd myreactapp

2. 필요한 라이브러리 설치
React 애플리케이션에서 HTTP 요청을 보내기 위한 axios 같은 라이브러리를 설치합니다.: cmd에서 실행
npm install axios

3. React 컴포넌트 생성
예를 들어, App.js를 기준으로 간단한 사용자 인터페이스와 API 호출 로직을 추가합니다. : javascript에서 실행
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleGreet = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/api/greet', { name });
      setMessage(response.data.message);
    } catch (error) {
      console.error("Error calling the API", error);
    }
  }

  return (
    <div className="App">
      <input 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        placeholder="Enter your name"
      />
      <button onClick={handleGreet}>Greet</button>
      <p>{message}</p>
    </div>
  );
}

export default App;

4. CORS 이슈 대응
Flask 서버와 React 앱은 다른 포트에서 실행되기 때문에 CORS(Cross-Origin Resource Sharing) 이슈가 발생할 수 있습니다. 이를 해결하기 위해 Flask 서버에 CORS 설정을 추가해야 합니다.

Flask에서 CORS를 처리하기 위해선 flask_cors 라이브러리를 설치하고 설정을 추가해야 합니다.: cmd에서 실행
pip install flask_cors

그 후, Flask 앱 코드에 다음과 같이 추가합니다: 위의 javascipt파일 수정
import React, { useState } from 'react';
import axios from 'axios';
function App() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleGreet = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/api/greet', { name });
      setMessage(response.data.message);
    } catch (error) {
      console.error("Error calling the API", error);
    }
  }
  return (
    <div className="App">
      <input 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        placeholder="Enter your name"
      />
      <button onClick={handleGreet}>Greet</button>
      <p>{message}</p>
    </div>
  );
}
export default App;
from flask_cors import CORS
CORS(app)

5. React 앱 실행
모든 설정이 끝나면, React 앱을 실행합니다.: cmd
npm start

이제 브라우저에서 React 앱을 열고, 이름을 입력한 후 "Greet" 버튼을 클릭하면 Flask 서버로부터의 인사말을 받을 수 있습니다.


"C:\Users\shini>npx create-react-app myreactapp
'npx'은(는) 내부 또는 외부 명령, 실행할 수 있는 프로그램, 또는
배치 파일이 아닙니다." 
-> 위의 오류가 발생시 대처법
->이 오류는 npx 명령어가 설치되지 않았거나 시스템 경로에 등록되지 않았음을 나타냅니다. npx는 npm의 5.2.0 버전 이후부터 포함된 도구입니다.
따라서, 먼저 Node.js와 npm을 최신 버전으로 업데이트하는 것이 좋습니다.
1)Node.js와 npm 설치/업데이트
Node.js 공식 웹사이트에 접속하여 LTS(Long Term Support) 버전을 다운로드하고 설치합니다. 이 과정에서 npm도 함께 설치됩니다.
설치 확인: cmd
node -v
npm -v
2)React 프로젝트 생성:cmd
npx create-react-app myreactapp
이제 다시 npm start 시 React 프로젝트를 생성할 수 있습니다.

"C:\Users\shini>npx create-react-app myreactapp
npm ERR! code ENOENT
npm ERR! syscall lstat
npm ERR! path C:\Users\shini\AppData\Roaming\npm
npm ERR! errno -4058
npm ERR! enoent ENOENT: no such file or directory, lstat 'C:\Users\shini\AppData\Roaming\npm'
npm ERR! enoent This is related to npm not being able to find a file.
npm ERR! enoent
npm ERR! A complete log of this run can be found in: C:\Users\shini\AppData\Local\npm-cache\_logs\2023-08-21T09_55_11_986Z-debug-0.log
C:\Users\shini>cd myreactapp
지정된 경로를 찾을 수 없습니다."
-> 오류시 대처법
->npx create-react-app myreactapp 명령어에서 발생한 오류로 인해 "myreactapp"이라는 디렉토리가 생성되지 않았기 때문에 cd myreactapp 명령어가 실패했습니다.
오류 내용을 보면, npm 관련 디렉토리에 문제가 있음을 알 수 있습니다. 이 문제는 때때로 npm의 전역 패키지 디렉토리와 관련된 오류로 발생합니다.
아래의 방법으로 해결해봅시다:
npm 전역 디렉토리가 존재하는지 확인
먼저, C:\Users\shini\AppData\Roaming\npm 경로가 실제로 존재하는지 확인해주세요. 만약 이 디렉토리가 존재하지 않는다면 생성해주세요.
npm 캐시 클리어
때때로 npm 캐시가 문제를 일으킬 수 있습니다. 캐시를 클리어해보세요.: cmd
npm cache clean --force
React 프로젝트 재생성
캐시를 클리어한 후 다시 React 프로젝트를 생성해보세요.: cmd
npx create-react-app myreactapp
npm 전역 디렉토리 재설정 (필요한 경우)
만약 위의 단계들로도 문제가 해결되지 않는다면, npm의 전역 디렉토리를 재설정해야 할 수 있습니다.: cmd
npm config set prefix C:\Users\shini\AppData\Roaming\npm

"C:\Users\shini>npm cache clean --force
npm WARN using --force Recommended protections disabled.
C:\Users\shini>npx create-react-app myreactapp
npm ERR! code ENOENT
npm ERR! syscall lstat
npm ERR! path C:\Users\shini\AppData\Roaming\npm
npm ERR! errno -4058
npm ERR! enoent ENOENT: no such file or directory, lstat 'C:\Users\shini\AppData\Roaming\npm'
npm ERR! enoent This is related to npm not being able to find a file.
npm ERR! enoent
npm ERR! A complete log of this run can be found in: C:\Users\shini\AppData\Local\npm-cache\_logs\2023-08-21T10_02_57_176Z-debug-0.log
C:\Users\shini>npm config set prefix C:\Users\shini\AppData\Roaming\npm"
-> 위의 오류시 대처법
->먼저, 명시된 경로 C:\Users\shini\AppData\Roaming\npm이 실제로 존재하는지 확인해주세요. 만약 해당 디렉토리가 없다면 직접 만들어주세요.
Windows 탐색기 (File Explorer)를 열고, 주소창에 C:\Users\shini\AppData\Roaming\를 입력하고 Enter 키를 눌러주세요.
npm라는 폴더가 있는지 확인하세요.
만약 npm 폴더가 없다면, 해당 위치에서 직접 npm 폴더를 만들어주세요.
폴더를 만든 후에 다시 npx create-react-app myreactapp 명령을 실행해 보세요.





react앱 생성이 잘 되었다면

React 앱 디렉토리로 이동:cmd
cd myreactapp

React 앱 실행:cmd
npm start
이 명령을 실행하면 기본 웹 브라우저가 자동으로 열릴 것이며 http://localhost:3000/ 주소로 React 앱이 실행됩니다. 이 상태에서는 아직 Flask API와 연동되지 않은 초기 React 화면만 볼 수 있습니다.

API 서버에 요청 보내기 위한 패키지 설치
React에서 HTTP 요청을 보내기 위해 axios라는 라이브러리를 사용할 것입니다. 이 라이브러리를 설치해야 합니다.:cmd
npm install axios

React에서 Flask API 호출하기
React 앱의 src 폴더 아래에 있는 App.js 파일을 편집하겠습니다. 이 파일은 React 앱의 메인 컴포넌트입니다.
App.js 파일을 열어서 다음과 같이 코드를 수정합니다: javascript
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/api/greet', {
        name: name
      });
      setMessage(response.data.message);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="App">
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" />
      <button onClick={handleSubmit}>Greet Me!</button>
      <p>{message}</p>
    </div>
  );
}

export default App;
