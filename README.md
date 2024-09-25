# Song Library Manager
This project is a simple web-based Song Library Manager that allows users to upload song data including the song name, artist, sheet music file, BPM, and a YouTube link. The application stores song entries locally in the browser's localStorage and dynamically displays them in a table. It also includes functionalities like searching, sorting by BPM, and deleting individual song entries.

# Features
Add Songs: Users can add a new song to the table by providing the song name, artist, BPM, YouTube link, and uploading a sheet music file.
Persistent Storage: Songs are saved in the browser's localStorage, so they persist between page reloads (but not across different devices).
Search Functionality: A search bar is provided to filter songs by name, artist, or any other column in the table.
Sorting by BPM: Users can click on the BPM column to sort the table by the song's BPM in ascending order.
Delete Songs: Each song entry has a delete button that allows users to remove the song from both the table and localStorage.
# How It Works
Song Submission Form: Users fill out a form with the song's details. The sheet music file can be uploaded, and the file name is displayed for confirmation.
Table Display: Once the form is submitted, the song information is added to the table, and the data is saved in localStorage.
Local Storage Management: Song data is stored in the browser using localStorage, allowing persistence across page reloads. However, it is important to note that this does not synchronize across different devices or browsers.
Search: Users can search for songs by typing in the search bar. The search filters through multiple columns such as song name, artist, and YouTube link.
Sorting by BPM: Clicking the "BPM" column sorts the songs by their BPM values in ascending order.
Delete Function: Each song entry has a delete button to remove it from the table and from localStorage.
