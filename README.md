# Song Library Manager
This project is a simple web-based Song Library Manager that allows users to upload song data including the song name, artist, sheet music file, BPM, and a YouTube link. The application stores song entries locally in the browser's localStorage and dynamically displays them in a table. It also includes functionalities like searching, sorting by BPM, and deleting individual song entries.

# Features
- **Add Songs:** Users can add a new song to the table by providing the song name, artist, BPM, YouTube link, and uploading a sheet music file.
- **Persistent Storage:** Songs are saved in the browser's local storage, so they persist between page reloads (but not across different devices).
- **Search Functionality:** A search bar is provided to filter songs by name, artist, or any other column in the table.
- **Sorting by Song or Artist name:** Users can click on the Song or Artist column to sort the table.
- **Delete Songs:** Each song entry has a delete button that allows users to remove the song from both the table and localStorage.
# How It Works
1. **Song Submission Form:** Users fill out a form with the song's details. The sheet music file can be uploaded, and the file name is displayed for confirmation.
2. **Table Display:** Once the form is submitted, the song information is added to the table, and the data is saved in localStorage.
3. **Local Storage Management:** Song data is stored in the browser using localStorage, allowing persistence across page reloads. However, it is important to note that this does not synchronize across different devices or browsers.
4. **Search:** Users can search for songs by typing in the search bar. The search filters through multiple columns such as song name, artist, and YouTube link.
# Technologies Used
- **HTML/CSS:** For the structure and styling of the web page.
- **JavaScript:** Handles song submission, table population, localStorage management, search, sort, and delete functionalities.
- **Fetch API:** Used to upload the sheet music file and submit the form data (for the server-side portion).
# Use Cases
- **Music Directors/Choir Leaders:** Easily manage a list of songs, track sheet music, and YouTube links for quick reference.
- **Band Members:** Organize and keep track of sheet music for practice sessions.
- **Personal Music Library:** Store and manage your favorite songs, YouTube covers, and other related files.
