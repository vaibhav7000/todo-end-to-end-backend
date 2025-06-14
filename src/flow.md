# Main express logic is written inside the index.js
- routes folder contains the route-handler logic (here it will contains the todo route-handler logic)
- controller folder contains the logic / function that will be call at the end and will contains the actual logic that is provided by that route
- middlewares folder contains the functions that need to be called before the actual route-handler logic starts
- db folder contains logic for storing the data in the mongoDB like declaring schemas