import React, { useState, useEffect } from "react";
import './App.css';

import Table from "./components/table";
import AddTable from "./components/AddTable";

function App() {
  const [modelOpen, setModelOpen] = useState(false);
  const [rows, setRows] = useState([]);
  const [selectedGrade, setSelectedGrade] = useState("grade1");
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedRowIdx, setSelectedRowIdx] = useState(null);

  const [rowsSum, setRowsSum] = useState({
    credits: "",
    attendanceScore: "",
    assignmentScore: "",
    midtermExam: "",
    finalExam: "",
    avgScore: "",
    totalScore: "",
    grade: "",
  });

  useEffect(() => {
    calculateSum();
  }, [rows, selectedGrade]);

  const handleDelete = () => {
    console.log('선택:', selectedRowIdx);
    console.log('삭제 전:', rows);
    
    if (selectedRowIdx !== null) {
      const rowToDelete = filteredRows[selectedRowIdx];
      
      const newRows = rows.filter(row => row !== rowToDelete);
      
      setRows(newRows);
      setSelectedRowIdx(null); 
    }
  
    console.log('삭제 후:', rows);
  };

  const closeModel = () => {
    setModelOpen(false);
  };

  const handleAddRow = (newRow) => {

    newRow.year = newRow.year || selectedGrade.slice(-1);
  
    const duplicate = rows.find(
      (row) =>
        row.courseName === newRow.courseName &&
        row.year === newRow.year &&
        row.grade !== "F"
    );
    
    if (duplicate) {
      setErrorMessage("동일한 과목이 이미 존재합니다.");
    } else {
      setRows([...rows, newRow]);
      setModelOpen(false);
      setErrorMessage("");
    }
  };

  const calculateSum = () => {
    const filteredRows = rows.filter(row => row.year === selectedGrade.slice(-1));

    const { sum, count } = filteredRows.reduce(
      (acc, row) => {
        if (row.credits === "1") {
          return acc;
        }
        return {
          sum: {
            credits: acc.sum.credits + Number(row.credits),
            attendanceScore: acc.sum.attendanceScore + Number(row.attendanceScore),
            assignmentScore: acc.sum.assignmentScore + Number(row.assignmentScore),
            midtermExam: acc.sum.midtermExam + Number(row.midtermExam),
            finalExam: acc.sum.finalExam + Number(row.finalExam),
            totalScore: acc.sum.totalScore + Number(row.totalScore),
          },
          count: acc.count + 1,
        };
      },
      {
        sum: { credits: 0, attendanceScore: 0, assignmentScore: 0, midtermExam: 0, finalExam: 0, totalScore: 0 },
        count: 0,
      }
    );

    const avgScore = count > 0 ? parseFloat((sum.totalScore / count).toFixed(1)) : 0;  // 평균 (소수점 1자리)
    const grade = avgScore >= 95 ? "A+" : avgScore >= 90 ? "A0" : avgScore >= 85 ? "B+" : 
                  avgScore >= 80 ? "B0" : avgScore >= 75 ? "C+" : avgScore >= 70 ? "C0" : 
                  avgScore >= 65 ? "D+" : avgScore >= 60 ? "D0" : "F";

    setRowsSum({
      credits: sum.credits > 0 ? sum.credits : "",
      attendanceScore: sum.attendanceScore > 0 ? sum.attendanceScore : "",
      assignmentScore: sum.assignmentScore > 0 ? sum.assignmentScore : "",
      midtermExam: sum.midtermExam > 0 ? sum.midtermExam : "",
      finalExam: sum.finalExam > 0 ? sum.finalExam : "",
      totalScore: sum.totalScore > 0 ? sum.totalScore : "",
      avgScore: avgScore > 0 ? avgScore : "",
      grade: count === 0 ? "" : grade,
    });
};

const filteredRows = rows
  .filter(row => {
    return (selectedGrade === "grade1" && row.year === "1") ||
           (selectedGrade === "grade2" && row.year === "2") ||
           (selectedGrade === "grade3" && row.year === "3");
  })
  .sort((a, b) => {
    // 이수
    if (a.completion < b.completion) return -1;
    if (a.completion > b.completion) return 1;
  
    // 필수
    if (a.pagrequirede < b.pagrequirede) return -1;
    if (a.pagrequirede > b.pagrequirede) return 1;
  
    // 과목명
    if (a.courseName < b.courseName) return -1;
    if (a.courseName > b.courseName) return 1;

    return 0
  });

  
  return (
    <div className="App">
      <header className="App-header">Front-end 과제</header>
      <div className="App-body">
        <div>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
          <div className="App-btns">
          <select
              className="App-select"
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value)}
            >
              <option value="grade1">1학년</option>
              <option value="grade2">2학년</option>
              <option value="grade3">3학년</option>
            </select>
            <div className="btn-group">
              <button className="Add-btn" onClick={() => setModelOpen(true)}>추가</button>
              {modelOpen && <AddTable closeModel={closeModel} onSubmit={handleAddRow} selectedGrade={selectedGrade} />}
              <button className="Delete-btn" onClick={handleDelete} disabled={selectedRowIdx === null}>삭제</button>
              <button className="Save-btn" onClick={calculateSum}>저장</button>
            </div>
          </div>
          <Table 
            rows={filteredRows}
            selectedRowIdx={selectedRowIdx} 
            setSelectedRowIdx={setSelectedRowIdx} 
            rowsSum={rowsSum} 
          />
        </div>
      </div>
    </div>
  );
}

export default App;
