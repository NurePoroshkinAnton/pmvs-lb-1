import "./styles.css"
import { setupWordSorter } from "./word-sorter.js"

document.querySelector("#app").innerHTML = `
  <div class="container">
    <h1>Сортування слів за алфавітом</h1>
    <div class="sorter-container">
      <label for="input-text">Введіть текст для сортування:</label>
      <textarea id="input-text" placeholder="Наприклад: яблуко вишня абрикос груша"></textarea>
      <button id="sort-button">Сортувати</button>
      <div id="result" class="result" style="display: none;"></div>
    </div>
  </div>
`

setupWordSorter()

