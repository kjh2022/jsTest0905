// mysource.js
//여기에 기능 입력

document.addEventListener('DOMContentLoaded', function() {
	//게시글 출력
	showBoard();


	//게시글 등록 버튼 이벤트

	//삭제
});

//선택삭제, 전체선택/해제 기능
function allChecked() {
	let checkbox = document.querySelectorAll('input[type="checkbox"]');
	checkbox.forEach(check => {
		check.checked = this.checked;
		console.log(this);
	});
}

//작성된 게시글 리스트 출력 함수
function showBoard() {
	let xhtp = new XMLHttpRequest();
	xhtp.open('get', './board');
	xhtp.send(); //서버 요청
	xhtp.onload = function() {
		let datas = JSON.parse(xhtp.response);
		console.log(datas);
		
		let list = document.getElementById('list');
		datas.forEach(data => {
			let tr = makeTr(data);
			list.append(tr);
		});
	}
}
	//게시글 등록 기능
	function upload() {
		let bno = document.getElementById('bno');
		let title = document.getElementById('title');
		let content = document.getElementById('content');
		let writer = document.getElementById('writer');
		let creDate = document.getElementById('creationDate');

		if (!title.value || !content.value || !writer.value) {
			alert('제목, 내용, 작성자는 필수 입력 사항입니다.');
			return;
		}
		const bValues = [title.value, content.value, mname.value];
		let tr = makeTr(bValues);
		document.getElementById('list').appendChild(tr);

		title.value = '';
		content.valu = '';
		mname.value = '';
		mid.focus();
	}




	//작성한 게시글 테이블 행에 등록
	function makeTr(data) {
		// tr 생성하는 부분

		let tr = document.createElement('tr');

		let td1 = document.createElement('td');
		let inp = document.createElement('input');
		inp.setAttribute('type', 'checkbox');
		td1.append(inp);
		
		let td2 = document.createElement('td');
		let txt2 = document.createTextNode(data.bno);
		td2.appendChild(txt2); //id

		let td3 = document.createElement('td');
		let txt3 = document.createTextNode(data.title);
		td3.appendChild(txt3); // first_name

		let td4 = document.createElement('td');
		let txt4 = document.createTextNode(data.content);
		td4.appendChild(txt4); // email



		let td5 = document.createElement('td');
		let txt5 = document.createTextNode(data.writer);
		td5.appendChild(txt5); // email

		let td6 = document.createElement('td');
		let txt6 = document.createTextNode(data.creation_date.slice(0,11));
		td6.appendChild(txt6); // email

		let td7 = document.createElement('td');
		let btn = document.createElement('button');
		let txt = document.createTextNode('삭제');
		btn.append(txt);
		td7.append(btn);

		tr.append(td1, td2, td3, td4, td5, td6, td7);

		return tr;
	}