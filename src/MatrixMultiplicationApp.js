// MatrixMultiplicationApp.js

import React, { useEffect, useState } from 'react';
import './MatrixMultiplicationApp.css';

function MatrixMultiplicationApp() {
  const [matrix1Rows, setMatrix1Rows] = useState(2);
  const [matrix1Cols, setMatrix1Cols] = useState(2);
  const [matrix2Rows, setMatrix2Rows] = useState(2);
  const [matrix2Cols, setMatrix2Cols] = useState(2);
  const [matrix1, setMatrix1] = useState(Array.from({ length: matrix1Rows }, () => Array(matrix1Cols).fill(0)));
  const [matrix2, setMatrix2] = useState(Array.from({ length: matrix2Rows }, () => Array(matrix2Cols).fill(0)));
  const [resultMatrix, setResultMatrix] = useState(Array.from({ length: matrix1Rows }, () => Array(matrix2Cols).fill(0)));

  const handleMatrixChange = (row, col, matrix, setMatrix, newValue) => {
    const updatedMatrix = [...matrix];
    updatedMatrix[row][col] = newValue;
    setMatrix(updatedMatrix);
  };

  function multiplyMatrices() {
    // Check if the matrices are compatible
    if(matrix1Cols != matrix2Rows) return;
    let i, j, k;
    let res = Array.from({ length: matrix1Rows }, () => Array(matrix2Cols).fill(0))
    for (i = 0; i < matrix1Rows; i++) { 
        for (j = 0; j < matrix2Cols; j++) { 
            res[i][j] = 0; 
            for (k = 0; k < matrix1Cols; k++) 
                res[i][j] += matrix1[i][k] * matrix2[k][j]; 
        } 
    }
    setResultMatrix(res)
}

  // matrix 1
  useEffect(() => {
    setMatrix1(Array.from({ length: matrix1Rows }, () => Array(matrix1Cols).fill(0)))
  }, [matrix1Rows, matrix1Cols])

  // matrix 2
  useEffect(() => {
    setMatrix2(Array.from({ length: matrix2Rows }, () => Array(matrix2Cols).fill(0)))
  }, [matrix2Rows, matrix2Cols])

  //result matrix
  useEffect(() => {
    setResultMatrix(Array.from({ length: matrix1Rows }, () => Array(matrix2Cols).fill(0)))
  }, [matrix1Rows, matrix2Cols])

  return (
    <div className="matrix-multiplication-app">
      <div>
        <label>
          Matrix 1 Rows:
          <input type="number" value={matrix1Rows} onChange={(e) => {
            setMatrix1Rows((prev) => {
              if(prev<1) return 1
              return e.target.value
            })
          }} />
        </label>
        <label>
          Matrix 1 Columns:
          <input type="number" value={matrix1Cols} onChange={(e) => {
            setMatrix1Cols((prev) => {
              if(prev<1) return 1
              return parseInt(e.target.value)
            })
          }} />
        </label>
      </div>

      <div>
        <label>
          Matrix 2 Rows:
          <input type="number" value={matrix2Rows} onChange={(e) => {
            setMatrix2Rows((prev)=>{
              if(prev<1)return 1
              return parseInt(e.target.value)
            })
          }} />
        </label>
        <label>
          Matrix 2 Columns:
          <input type="number" value={matrix2Cols} onChange={(e) => {
            setMatrix2Cols((prev)=>{
              if(prev<1)return 1
              return parseInt(e.target.value)
            })
          }} />
        </label>
      </div>

      <div>
        <h3>Matrix 1</h3>
        {matrix1.map((row, i) => {
          return (
            <div key={i}>
              {row.map((cell, j) => (
                <input
                  key={j}
                  type="number"
                  value={cell}
                  onChange={(e) => handleMatrixChange(i, j, matrix1, setMatrix1, parseFloat(e.target.value))}
                />
              ))}
            </div>
          )
        })}
      </div>

      <div>
        <h3>Matrix 2</h3>
        {matrix2.map((row, i) => {
          return (
            <div key={i}>
              {row.map((cell, j) => (
                <input
                  key={j}
                  type="number"
                  value={cell}
                  onChange={(e) => handleMatrixChange(i, j, matrix2, setMatrix2, parseFloat(e.target.value))}
                />
              ))}
            </div>
          )
        })}
      </div>
      <button onClick={()=>multiplyMatrices()}>Calculate</button>
      <div>
        <h3>Result</h3>
        {resultMatrix.map((row, i) => {
          return (
            <div key={i}>
              {row.map((cell, j) => (
                <input
                  key={j}
                  type="number"
                  value={cell}
                  readOnly={true}
                />
              ))}
            </div>
          )
        })}
      </div>
    </div> 
  )
}

export default MatrixMultiplicationApp;
