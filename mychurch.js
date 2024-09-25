document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('songSubmissionForm');
    const tableBody = document.querySelector('#myTable tbody');
    const deleteFile = document.getElementById('delete-file');


    // Load saved songs from localStorage when the page loads
    loadSongsFromStorage();
    deleteFile.style.display = 'none'; 


    // Event listener for the file name display
    document.getElementById('sheetMusic').addEventListener('change', function(e) {
        const fileName = e.target.files[0].name;
        document.getElementById('sheetMusicFileName').textContent = fileName;
        deleteFile.style.display = 'inline'
    });

    deleteFile.addEventListener('click', function() {
        const fileInput = document.getElementById('sheetMusic');
        fileInput.value = "";
        document.getElementById('sheetMusicFileName').textContent = '';
    
        deleteFile.style.display = 'none'; 
    
    });



    // Event listener for form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Create a FormData object to handle file and data submission
        const formData = new FormData();
        formData.append('songName', document.getElementById('songName').value);
        formData.append('artist', document.getElementById('artist').value);
        formData.append('BPM', document.getElementById('BPM').value);
        formData.append('sheetMusic', document.getElementById('sheetMusic').files[0]);
        formData.append('youtubeLink', document.getElementById('youtubeLink').value);

        // Send the data to the server using Fetch API
        fetch('http://localhost:3000/upload', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);

            // Add the song to the table
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td>${data.songName}</td>
                <td>${data.artist}</td>
                <td><a style="color: white" href="${data.sheetMusicURL}" download="${data.sheetMusicName}">${data.sheetMusicName}</a></td>
                <td><a style="color: white" href="${data.youtubeLink}" target="_blank">${data.youtubeLink}</a></td>
                <td>${data.BPM}</td>
                <td><button class="delete-btn" data-song="${data.songName}">x</button></td>
            `;

            newRow.querySelector('.delete-btn').addEventListener('click', function(e) {
                const songName = e.target.getAttribute('data-song');
            
                // Remove the row from the table
                newRow.remove();
            
                // Remove the song from localStorage
                deleteSongFromLocalStorage(songName);
            });
    
            tableBody.appendChild(newRow);

            // Save the song to localStorage with the necessary metadata
            saveSongToLocalStorage({
                songName: data.songName,
                artistName: data.artist,
                sheetMusicFileName: data.sheetMusicName, // Save only the name of the file
                youtubeLink: data.youtubeLink,
                BPM: data.BPM,
                sheetMusicURL: data.sheetMusicURL // Include the URL
            });

            // Clear the form
            form.reset();
            document.getElementById('sheetMusicFileName').textContent = '';
            deleteFile.style.display = 'none'; 
            // Clear file name display
        })
        .catch(error => console.error('Error:', error));
    });

   

    function deleteSongFromLocalStorage(songName) {
        let songs = JSON.parse(localStorage.getItem('songs')) || [];
        const updatedSongs = songs.filter(song => song.songName !== songName);
        localStorage.setItem('songs', JSON.stringify(updatedSongs));
    }

    // Function to save the song to localStorage
    function saveSongToLocalStorage(song) {
        let songs = JSON.parse(localStorage.getItem('songs')) || [];
        songs.push(song);
        localStorage.setItem('songs', JSON.stringify(songs));
    }

    // Function to load songs from localStorage on page load
    function loadSongsFromStorage() {
        let songs = JSON.parse(localStorage.getItem('songs')) || [];
        songs.forEach(song => {
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td>${song.songName}</td>
                <td>${song.artistName}</td>
                <td><a style="color: white" href="${song.sheetMusicURL}" download>${song.sheetMusicFileName}</a></td>
                <td><a style="color: white" href="${song.youtubeLink}" target="_blank">${song.youtubeLink}</a></td>
                <td>${song.BPM}</td>
                <td><button class="delete-btn" data-song="${song.songName}">x</button></td>
            `;
    
            // Add the event listener for the delete button
            newRow.querySelector('.delete-btn').addEventListener('click', function(e) {
                const songName = e.target.getAttribute('data-song');
            
                // Remove the row from the table
                newRow.remove();
            
                // Remove the song from localStorage
                deleteSongFromLocalStorage(songName);
            });
    
            tableBody.appendChild(newRow);
        });
    }

    // Clear local storage button functionality
    document.getElementById('clearStorageBtn').addEventListener('click', function() {
        localStorage.clear();
        console.log('Local storage cleared');
        location.reload(); // Reload the page to reflect changes
    });

    
        
    
});

function songSearch() {
    let input, filter, tBody, tr, td, txtValue;
    input = document.getElementById('myInput');
    filter = input.value.toUpperCase();
    tBody = document.getElementById('table-body');
    tr = tBody.getElementsByTagName('tr'); // Get all rows in the table body

    for (let i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName('td'); // Get all cells in the current row
        let found = false;

        for (let j = 0; j < td.length; j++) {
            if (td[j]) {
                txtValue = td[j].textContent || td[j].innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    found = true; // Mark as found if any column matches
                    break;
                }
            }
        }

        if (found) {
            tr[i].style.display = ""; // Show row if a match is found in any column
        } else {
            tr[i].style.display = "none"; // Hide row if no match
        }
    }
}


function sortTable(n) {
    let table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("myTable");
    switching = true;
    // Set the sorting direction to ascending:
    dir = "asc";
    /* Make a loop that will continue until
    no switching has been done: */
    while (switching) {
      // Start by saying: no switching is done:
      switching = false;
      rows = table.rows;
      /* Loop through all table rows (except the
      first, which contains table headers): */
      for (i = 1; i < (rows.length - 1); i++) {
        // Start by saying there should be no switching:
        shouldSwitch = false;
        /* Get the two elements you want to compare, 
        one from current row and one from the next: */
        x = rows[i].getElementsByTagName("TD")[n];
        y = rows[i + 1].getElementsByTagName("TD")[n];
        /* Check if the two rows should switch place,
        based on the direction, asc or desc: */
        if (dir == "asc") {
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            // If so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        } else if (dir == "desc") {
          if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
            // If so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        }

        
      }
      if (shouldSwitch) {
        /* If a switch has been marked, make the switch
        and mark that a switch has been done: */
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        // Each time a switch is done, increase this count by 1:
        switchcount ++;
      } else {
        /* If no switching has been done AND the direction is "asc",
        set the direction to "desc" and run the while loop again. */
        if (switchcount == 0 && dir == "asc") {
          dir = "desc";
          switching = true;
        } 
    

      }


      
    }
  }


