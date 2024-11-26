import React, { useState } from "react";
import "./AddTable.css";

function AddTable({ closeModel, onSubmit, selectedGrade}) {
  const [formState, setFormState] = useState({
    completion: "전공",
    pagrequirede: "필수",
    courseName: "",
    credits: "1",
    attendanceScore: "",
    assignmentScore: "",
    midtermExam: "",
    finalExam: "",
    totalScore: "",
    grade: "P",
    year: selectedGrade === "grade1" ? "1" : selectedGrade === "grade2" ? "2" : "3",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  console.log(selectedGrade);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const { credits, attendanceScore, assignmentScore, midtermExam, finalExam } = formState;
    let attendance = Number(attendanceScore);
    let assignment = Number(assignmentScore);
    let midterm = Number(midtermExam);
    let final = Number(finalExam);
    let credit = Number(credits);
    let total = attendance + assignment + midterm + final;

    let score = "";
    if (credit > 1) {
      if (total >= 95) score = "A+";
      else if (total >= 90) score = "A0";
      else if (total >= 85) score = "B+";
      else if (total >= 80) score = "B0";
      else if (total >= 75) score = "C+";
      else if (total >= 70) score = "C0";
      else if (total >= 65) score = "D+";
      else if (total >= 60) score = "D0";
      else score = "F";
    } else {
      score = formState.grade;
      credit = "";
      attendance = "";
      assignment = "";
      midterm = "";
      final = "";
      total = "";
    }

    const updatedFormState = {
      ...formState,
      attendanceScore: attendance,
      assignmentScore: assignment,
      midtermExam: midterm,
      finalExam: final,
      totalScore: total,
      grade: score,
    };

    if (midterm > 30 || finalExam > 30){
      setErrorMessage("중간/기말 점수는 30보다 클 수 없다.");      
      return;
    }
    if (attendance > 20 || assignment > 20){
      setErrorMessage("출석/과제 점수는 20보다 클 수 없다.");
      return;
    }
    if (total > 101) {
      setErrorMessage("과목별 총점은 100보다 클 수 없다.");
      return;
    }
    if (!formState.courseName) {
      setErrorMessage("과목명을 입력해 주세요.");
      return;
    }

    onSubmit(updatedFormState);
    closeModel();
  };

  return (
    <div className="container">
      <div className="model">
      {errorMessage && <div className="error-message">{errorMessage}</div>}
        <form>
          <div className="form-group">
            <label htmlFor="completion">이수</label>
            <select
              name="completion"
              value={formState.completion}
              onChange={handleChange}
            >
              <option value="전공">전공</option>
              <option value="교양">교양</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="pagrequirede">필수</label>
            <select
              name="pagrequirede"
              value={formState.pagrequirede}
              onChange={handleChange}
            >
              <option value="필수">필수</option>
              <option value="선택">선택</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="courseName">과목명</label>
            <input
              name="courseName"
              value={formState.courseName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="credits">학점</label>
            <input
              name="credits"
              type="number"
              value={formState.credits}
              onChange={handleChange}
            />
          </div>

          {formState.credits === "1" && (
            <div className="form-group">
              <label htmlFor="passFail">성적</label>
              <select
                name="grade"
                value={formState.grade}
                onChange={handleChange}
              >
                <option value="P">Pass</option>
                <option value="NP">Non Pass</option>
              </select>
            </div>
          )}

          {formState.credits > 1 && (
            <>
              <div className="form-group">
                <label htmlFor="attendanceScore">출석점수</label>
                <input
                  name="attendanceScore"
                  type="number"
                  value={formState.attendanceScore}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="assignmentScore">과제점수</label>
                <input
                  name="assignmentScore"
                  type="number"
                  value={formState.assignmentScore}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="midtermExam">중간고사</label>
                <input
                  name="midtermExam"
                  type="number"
                  value={formState.midtermExam}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="finalExam">기말고사</label>
                <input
                  name="finalExam"
                  type="number"
                  value={formState.finalExam}
                  onChange={handleChange}
                />
              </div>
            </>
          )}
          <div className="horizon">
            <button className="btn" type="button" onClick={closeModel}>
              취소
            </button>
            <button className="btn" type="button" onClick={handleSubmit}>
              입력
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddTable;
