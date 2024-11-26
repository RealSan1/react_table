import React, { useState } from "react";
import './App.css';

function Form({ onAdd }) {
  const [completion, setCompletion] = useState("전공");
  const [required, setRequired] = useState("필수");
  const [courseName, setCourseName] = useState("");
  const [credits, setCredits] = useState(0);
  const [attendanceScore, setAttendanceScore] = useState(0);
  const [assignmentScore, setAssignmentScore] = useState(0);
  const [midtermExam, setMidtermExam] = useState(0);
  const [finalExam, setFinalExam] = useState(0);
  const [selectedGrade, setSelectedGrade] = useState("1학년");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({
      completion,
      required,
      courseName,
      credits,
      attendanceScore,
      assignmentScore,
      midtermExam,
      finalExam,
      totalScore: attendanceScore + assignmentScore + midtermExam + finalExam,
      average: ((attendanceScore + assignmentScore + midtermExam + finalExam) / 4).toFixed(2),
      grade: selectedGrade,
    });

    // 폼 초기화
    setCourseName("");
    setCredits(0);
    setAttendanceScore(0);
    setAssignmentScore(0);
    setMidtermExam(0);
    setFinalExam(0);
    setSelectedGrade("");
  };

  return (
    <form onSubmit={handleSubmit} className="App-Form">
      <select
            value={completion}
            onChange={(e) => setCompletion(e.target.value)} >
            <option value="전공">전공</option>
            <option value="교양">교양</option>
      </select>
      <select
            value={required}
            onChange={(e) => setRequired(e.target.value)} >
            <option value="필수">필수</option>
            <option value="선택">선택</option>
      </select>
      <input
        type="text"
        placeholder="과목명"
        value={courseName}
        onChange={(e) => setCourseName(e.target.value)}
        required />
      <input
        type="number"
        placeholder="학점"
        value={credits}
        onChange={(e) => setCredits(Number(e.target.value))}
        required />
      <input
        type="number"
        placeholder="출석점수"
        value={attendanceScore}
        onChange={(e) => setAttendanceScore(Number(e.target.value))}
        required />
      <input
        type="number"
        placeholder="과제점수"
        value={assignmentScore}
        onChange={(e) => setAssignmentScore(Number(e.target.value))}
        required />
      <input
        type="number"
        placeholder="중간고사"
        value={midtermExam}
        onChange={(e) => setMidtermExam(Number(e.target.value))}
        required />
      <input
        type="number"
        placeholder="기말고사"
        value={finalExam}
        onChange={(e) => setFinalExam(Number(e.target.value))}
        required />
      <select
        value={selectedGrade}
        onChange={(e) => setSelectedGrade(e.target.value)} >
        <option value="1학년">1학년</option>
        <option value="2학년">2학년</option>
        <option value="3학년">3학년</option>
      </select>
      <button type="submit">저장</button>
    </form>
  );
}

export default Form;
