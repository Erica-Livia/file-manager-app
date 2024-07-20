
        const uploadForm = document.getElementById('uploadForm');
        const filesTable = document.getElementById('filesTable').getElementsByTagName('tbody')[0];

        // Function to upload file
        uploadForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(uploadForm);

            try {
                const response = await fetch('/upload', {
                    method: 'POST',
                    body: formData
                });

                if (!response.ok) {
                    throw new Error('Failed to upload file');
                }

                await loadFiles();
            } catch (err) {
                alert(err.message);
            }
        });

        // Function to load files
        async function loadFiles() {
            try {
                const response = await fetch('/list');
                const files = await response.json();

                filesTable.innerHTML = ''; // Clear existing table rows

                files.forEach(file => {
                    const row = filesTable.insertRow();
                    row.insertCell().textContent = file.originalName;
                    row.insertCell().textContent = `${file.size} bytes`;

                    const actionsCell = row.insertCell();
                    const downloadButton = document.createElement('button');
                    downloadButton.textContent = 'Download';
                    downloadButton.onclick = () => downloadFile(file._id);
                    
                    const deleteButton = document.createElement('button');
                    deleteButton.textContent = 'Delete';
                    deleteButton.onclick = () => deleteFile(file._id);

                    actionsCell.appendChild(downloadButton);
                    actionsCell.appendChild(deleteButton);
                });
            } catch (err) {
                alert(err.message);
            }
        }

        // Function to download file
        async function downloadFile(fileId) {
            try {
                const response = await fetch(`/download/${fileId}`);
                if (!response.ok) {
                    throw new Error('Failed to download file');
                }
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = fileId;
                document.body.appendChild(a);
                a.click();
                a.remove();
            } catch (err) {
                alert(err.message);
            }
        }

        // Function to delete file
        async function deleteFile(fileId) {
            try {
                const response = await fetch(`/delete/${fileId}`, {
                    method: 'DELETE'
                });

                if (!response.ok) {
                    throw new Error('Failed to delete file');
                }

                await loadFiles();
            } catch (err) {
                alert(err.message);
            }
        }

        // Load files when the page loads
        window.onload = loadFiles;
    