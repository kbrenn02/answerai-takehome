# AnswersAi Take Home Assessment

Setup instructions (including environment variables):
1. Clone the repo
    `git clone https://github.com/kbrenn02/answerai-takehome.git`
    `cd data-viz-platform`
2. Install dependencies
    `npm install`
3. I made the .env public so you can just use my variables. This makes it easier for everyone.
4. Run the app
    `npm run dev`
    * Once you've run the app, you will need to login in with Google or sign up with email/password

Features Implemented:
- Dynamic and interactive graph:
    - choose which variables you want to show with the "Edit Variables" button at the top of the dashboard. These
    variables will then be available in the dropdown menu on the graph
    - hover over points on the graph for more information
    - graph uses dummy data but is set up in a way to show different graphs for different variables and real data can be included
- KPIs dashboard:
    - this is static with dummy data, but the component could be adjusted to ingest real data
- Sliding panel for variables:
    - Triggered by clicking the “Edit Variables” button on the dashboard
    - Opens a slide-over card with smooth transitions
    - Allows the user to modify the variables used in the visualization.
- Login page presenting different options for logging in.
- Static features:
    - nav bar
    - top bar with buttons
    - search bar
    - almost every button except for "edit variables" and the graph dropdown menu

Technical Decisions and Trade-Offs:
- Custom SVG over chart libraries:
    - Pros: Full control over rendering and styling; lightweight.
    - Cons: More manual math and DOM manipulation; harder to maintain.
    - Thoughts: I thought this was going to be faster and wanted to show my skills, but this ended up being long and 
    painful and if given the chance again, I probably would just use a really good chart library
- Tailwind CSS for styling:
    - Pros: Rapid styling, responsive utilities. I'm also very familiar with Tailwind
    - Cons: Have to style every individual element.
    - Thoughts: Especially with responsive design to mobile, tablet, and desktop, I would probably next time just have
    a global CSS file. That would also help keep colors constant, buttons constant, and be a bit more flexible with the colors
- Dummy data for everything:
    - Easier to prototype and test. Since this was an interview, I just got some pre-generated data in my preferred format

Known limitations:
- Testing:
    - I did some testing, but not nearly as much as I wanted to get done. Given more time, I would have more robust testing on:
        - responsiveness at different screen sizes
        - how the graph changes with different data and sizes
        - KPI variable choice
- Navbar is static:
    - Since there was really only one page, the navbar was more aesthetic than anything
- Edit Variable Hover descriptions:
    - I need more testing on the hover descriptions. I've noticed that sometimes if multiple hoverings happen quickly, it freaks
    out and will show them delayed or they won't disappear when you've stopped hovering. The timing also isn't working as expected

Time spent:
- ~6 hours
- Reason:
    - My laptop was having an issue with Firebase, so setting up authentication was taking longer than expected
    - Building the graph manually increased my time more than I wanted and I did end up asked stackoverflow for assistance on it

Local development instructions:
1. Dev Server
    - See setup instructions
    - run `npm run dev` 
    - go to `http://localhost:3000` in your browser
2. Production Server
    - instead of `npm run dev`, run `npm run build`
    - to preview, run `npm run start` 

Feedback:
- I think there were some limitations of the prompt that were unaccounted for on your side. For example:
    - Design Implementation -> "Pixel-perfect recreation of provided Figma designs"
        - Dummy data, colors, icons, and fonts were not provided
        - As I was prioritizing speed over style, I used placeholders for all of the above
            - While this isn't a pixel-perfect recreation, the functionality works as expected and the stylistic elements
            can easily be swapped out
    - Technical Implementation -> "Robust authentication and routing setup"
        - There was almost no focus on this in the instructions outside of the tech implementation section
        - It seemed that most of the focus was on the dashboard. I think if you wanted more focus on the auth (outside
        of doing it with Firebase, there should have been more focus on that)
- Communication:
    - I reached out with a design question the day before this was due and still haven't received a response as of 20 min before
    the assessment is due. 