// mysource.js
//여기에 기능 입력
const boards = [];

document.addEventListener('DOMContentLoaded', function () {
    //게시글 출력
    showBoard();
    //게시글 등록 버튼 이벤트
    let addBtn = document.querySelector('addBtn');
    addBtn.addEventListener('click', upload)
    //선택삭제
    let chk = document.getElementById('allCheck');
    chk.addEventListener('click', allChecked);
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
    fetch('./board', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'bno=' + bno + '&title=' + title + '&content=' + content + '&writer=' + writer + '&creationDate=' + creationDate
        })
        .then(result => result.text())
        .catch(error => console.error(error));
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
function makeTr(bValues = []) {
    //체크박스 추가
    let ckbx = document.createElement('input');
    ckbx.addEventListener('click', function (e) {
        e.stopPropagation();
    });
    ckbx.addEventListener('change', function () {
        let checkProp = document.querySelectorAll('body tr input[type="checkbox"]');
        document.getElementById('allCheck').checked = [...checkProp].every(item => {
            return item.checked == true
        });
    });
    ckbx.setAttribute('type', 'checkbox');
    td = document.createElement('td');
    td.appendChild(ckbx);
    tr.appendChild(td);

    //클릭 시 게시글 등록되게
    let tr = document.createElement('tr');

    tr.addEventListener('click', function () {
        let text = this.firstElementChild.nextSibling.innerText;
        document.getElementById('mid').value = text;
        text = this.firstElementChild.nextSibling.nextSibling.innerText;
        document.getElementById('title').value = text;
        text = this.firstElementChild.nextSibling.nextSibling.nextSibling.innerText;
        document.getElementById('content').value = text;
        text = this.firstElementChild.nextSibling.nextSibling.nextSibling.nextSibling.innerText;
        document.getElementById('writer').value = text;
        //작성날짜 들어가야함
    }, false);

    bValues.forEach(val => {
        let td = document.createElement('td');
        let txt = document.createTextNode(val);
        td.appendChild(txt);
        tr.appendChild(td);

    });
    //삭제 버튼 추가
    let td = document.createElement('td');
    let btn = document.createElement('button');
    let txt = document.createTextNode('삭제');

    btn.addEventListener('click', function (e) {
        if (confirm("정말 삭제하시겠습니까?") == true) {
            this.parentElement.parentElement.remove();
        } else {
            return false;
        }
        e.stopPropagation();
    }, false);
    btn.appendChild(txt);
    td.appendChild(btn);
    tr.appendChild(td);


    return tr;
}