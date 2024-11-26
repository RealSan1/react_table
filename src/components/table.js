import React from "react";

function Table({ rows, selectedRowIdx, setSelectedRowIdx, rowsSum }) {
  return (
    <div className="table-wrapper">
      <table className="table">
        <thead>
          <tr>
            <th>이수</th>
            <th>필수</th>
            <th>과목명</th>
            <th>학점</th>
            <th>출석점수</th>
            <th>과제점수</th>
            <th>중간고사</th>
            <th>기말고사</th>
            <th>총점</th>
            <th>평균</th>
            <th>성적</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr
              key={idx}
              onClick={() => setSelectedRowIdx(idx)}
              style={{
                backgroundColor: selectedRowIdx === idx ? "#f0f0f0" : "white",
              }}
            >
              <td>{row.completion}</td>
              <td>{row.pagrequirede}</td>
              <td>{row.courseName}</td>
              <td>{row.credits}</td>
              <td>{row.attendanceScore}</td>
              <td>{row.assignmentScore}</td>
              <td>{row.midtermExam}</td>
              <td>{row.finalExam}</td>
              <td>{row.totalScore}</td>
              <td></td>
              <td style={{ color: row.grade === "F" ? "red" : "black" }}>
                  {row.grade}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3">합계</td>
            <td>{rowsSum.credits}</td>
            <td>{rowsSum.attendanceScore}</td>
            <td>{rowsSum.assignmentScore}</td>
            <td>{rowsSum.midtermExam}</td>
            <td>{rowsSum.finalExam}</td>
            <td>{rowsSum.totalScore}</td>
            <td>{rowsSum.avgScore}</td>
            <td style={{ color: rowsSum.grade === "F" ? "red" : "black" }}>
              {rowsSum.grade}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default Table;
