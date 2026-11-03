const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// JSON 데이터 처리를 위한 설정
app.use(express.json());

// 정적 파일(index.html 등) 서빙
app.use(express.static(path.join(__dirname)));

// 데이터 읽기 API (GET)
app.get('/api/data', (req, res) => {
    const filePath = path.join(__dirname, 'data.json');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: '데이터를 읽지 못했습니다.' });
        }
        res.send(JSON.parse(data || '{}'));
    });
});

// 데이터 쓰기/저장 API (POST) - data.json에 실시간 저장
app.post('/api/data', (req, res) => {
    const filePath = path.join(__dirname, 'data.json');
    const newData = JSON.stringify(req.body, null, 2);

    fs.writeFile(filePath, newData, 'utf8', (err) => {
        if (err) {
            return res.status(500).json({ error: '데이터를 저장하지 못했습니다.' });
        }
        res.json({ success: true, message: '저장 완료!' });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});