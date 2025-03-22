import { API_URL } from "./env.js"

export function setupWordSorter() {
    const sortButton = document.getElementById("sort-button")
    const inputText = document.getElementById("input-text")
    const resultDiv = document.getElementById("result")

    async function sortWords() {
        try {
            const text = inputText.value.trim()

            if (!text) {
                showResult("Будь ласка, введіть текст для сортування", true)
                return
            }

            const response = await fetch(`${API_URL}/sort`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ text }),
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.error || "Помилка сервера")
            }

            const data = await response.json()
            showResult(`
        <p><strong>Оригінальний текст:</strong> ${data.original}</p>
        <p><strong>Відсортований текст:</strong> ${data.sorted}</p>
      `)
        } catch (error) {
            showResult(`Помилка: ${error.message}`, true)
        }
    }

    function showResult(message, isError = false) {
        resultDiv.innerHTML = message
        resultDiv.style.display = "block"

        if (isError) {
            resultDiv.classList.add("error")
        } else {
            resultDiv.classList.remove("error")
        }
    }

    sortButton.addEventListener("click", sortWords)

    inputText.addEventListener("keypress", function (event) {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault()
            sortWords()
        }
    })
}

