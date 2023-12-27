## Initial Thoughts
- We want a simple UI that shows a collapsable tree of pages, with data provided by a separately hosted backend api.

### thinking about the problem
- the tree needs to be collapsable, more than one node can be open at the same time
- the example data shows that the tree is 2 levels deep, but there could reasonably be fewer or more levels as well
- the example data does not contain a lot of pages, but i could well imagine that we could get hundreds or even thousands of pages listed, this could affect usability as well as performance
- can imagine other behaviour such as search, navigating through the tree, moving pages around in the tree or adding new pages to be added later
- could also imagine that the data changes while the user is on the page, how do we keep the UI in sync with any changes happening to the data in the backend?
- could also image that in the future, we might only get data for the current folder and subfolders, and that on expanding a new folder we might query the api to get additional data at that point

### approach
- i'll go ahead and put the ui and api in the same repo
- i'll use a vue3-vite-ts starter and an express-ts starter
- i'll then get the starters deployed to and running in the cloud, if there's any problems i'd rather find out early
- i'll then add the data to the api and make sure i can access it from the UI, see that things like CORS is properly setup
- i'll then code up the page tree.

### page tree assumptions
- no more than 5 levels (so the tree doesn't run off the screen)
- no more than 100 items (that can comfortably fit on a page) 
- page ids are unique and don't repeat within the tree
- page names are not unique
- page names are reasonably short, can always truncate after 100 characters

# Afterthoughts
- i did the api first, then loading the data from the api, including runtime validation of the received data, then i coded up the page tree component last. I think this worked well
- when you add an api into the mix, many things can start to go wrong. what if you lose internet connection? what if your request doesn't complete? what if the api was updated and no longer gives the response you expect? what if the browser hasn't been refreshed in a while and is running and old version of the UI? 
- i wanted to show in this code how you can go about handling this additional complexity, so i've implemented things like request timeouts, retry and runtime validation of response data
- I've tested the code throughout, I care about being able to run the tests and having high confidence that the app is still working
- Given more time I would have liked to have added a simple deploy pipeline
- I would have also added a single cypress test, this can be run as a smoketest after a deploy
- I normally use vue testing library with msw, i tried using only vue test utils here as an experiment