# Gomodoro

Pomodoro timer using the flowtime technique to automatically calculate break times.
Written in angular using html, scss, and typescript.

## Thesis

### Current Timers

I have tried many pomodoro apps and most focus heavily on blocking other apps and setting large time blocks and trying to stick to them. I find these often set the user up for failure as we (including me) are usually a bit over ambitious with what we think we can accomplish in a day. Also often times we need to check an app quickly and breaking an entire focus session to answer a text or grab a password can be very demotivating. The apps also try and make the user feel bad for breaking the focus session. These also incentivize the user to lie and bend the rules on what the focus session is which can also be demotivating.

### The Gomodoro Timer

Instead with Gomodoro the user begins the focus session and the timer begins to count up. If they feel they are losing focus or energy they can decide to stop the timer. The app will then calculate the proper break time to give the user based on how long they already focused. Then the timer will begin counting down faster than it counted up (as break time should be less than work time). Once the timer reaches zero the user will be notified to begin their focus session again. If they do not begin the focus session and press start again it will be assumed they are done studying/doing whatever they were doing. This puts the user in control of their focus time. It also stops the user from setting a lofty goal or feeling bad if something important comes up during their decided focus block.

## Selling Point

First: thanks for reading this far, Second: This will be sharing complaints of other pomodoro timer apps but does not mean they are bad in any way. This is all personal preference and my opinions on what would better suit me.

### Pricing

Most other pomodoro timers have pricing models that are often ineffective. "Forest" uses the $2 app cost model. This works but they also often advertise their new trees for the user to purchase in their app ironically distracting the user from starting their focus session. Other apps use monthly/yearly/lifetime subscriptions which often heavily restrict use of the app until purchase. They also often times don't have a desktop companion for their app which restricts the user to using their phone which leads to distraction.

The Gomodoro pricing model will include every feature that can be locally hosted. Syncing the users data should also not be a problem but may be a paid feature. The paid features will be customizability with a $5 Patreon subscription. This also keeps the subscription off the app store allowing the developer (me) to get a larger share of the profit. This should also allow more AI or data storing features to be included as these require money to run.

In short, anything that doesn't cost money to host will be free excluding visuals.

### Blocking Apps

In other apps like "FocusPomo", "Forest", and even "Focus Friend" they have a large focus on blocking apps. I think combining a pomodoro timer with app blocking creates more anxiety around starting the session than it is worth and creates a negative feedback loop around starting another session. As well as everything else stated above I think this is a bad idea.

Instead with Gomodoro blocking apps will be discouraged. Apps that are accessed instead of stopping the focus session will immediately trigger break mode and start counting down. This will only occur if the user has specifically selected this feature to be turned on. Fully blocking apps will still be a feature but not be recommended.

## Building

Run on localhost
```
npm i
ng serve
```

Build exe with tauri
```
npm run tauri build
```


## To Do

Bugs
- [ ] On loading of time inbetween running states circles inside do not update
- [ ] On pressing break/work button while paused time does not update

User setting imporovements
- [ ] Create settings menu 
    - [ ] Add "total time focused" time at bottom of settings
    - [ ] Add ability to reset back to time when last closed
      - Add saving previous time to local storage
      - Should save when it runs the "reopen" thing
    - [ ] Add subtract 15 minutes button
- [ ] Make sure the seconds can never go over max integer size

### To Do : Complete
- [X] `11.18.2025` Times above 24 hours now display properly
- [X] `11.14.2025` Move clicking on circles to hide to settings menu
- [X] `11.14.2025` Remove clicking on circles to hide
- [X] `11.14.2025` Create light, dark, and midnight modes
- [X] `11.13.2025` Base all components on local styles.scss file
- [X] `11.06.2025` Store if the user has paused in local storage
- [X] `11.06.2025` Store if the user is on break in local storage
- [X] `11.06.2025` Recall break and pause on reload
- [X] `11.06.2025` Convert all files to use variables for colors
- [X] `11.05.2025` Create colors.scss file to store all colors
- [X] `11.03.2025` Add a Patreon button at the top of user settings
- [X] `10.30.2025` User can change break time split (2:1, 3:1, 4:1, 5:1)
- [X] `10.28.2025` Add reset time button
- [X] `10.27.2025` When time on screen is hidden show "Gomodoro" in the title bar
- [X] `10.27.2025` Show current amount of time in the title bar
- [X] `10.27.2025` Creates red icon when out of time
- [X] `10.27.2025` Break button color changes with pause button
- [X] `10.27.2025` Create favicon for when pomodoro is paused (gray)
- [X] `10.27.2025` Create favicon for when in break mode (purple)
- [x] `10.19.2025` Added dark mode and light mode iOS Support
- [x] `10.19.2025` Added progressive web app icon
- [x] `10.17.2025` Create image favicon (Probably a 3/4 complete circle)
- [x] `10.16.2025` Create settings button
- [x] `10.16.2025` Add top header section
- [x] `10.15.2025` Add notification that says your break time is up
- [x] `10.15.2025` User can choose to show or hide circles by clicking
- [x] `10.15.2025` Fix bug where minimized window doesn't count time
- [x] `10.14.2025` Saving data also saves circles state
- [x] `10.13.2025` Custom pause and play SVG's instead of text
- [x] `10.13.2025` Store the users break data
- [x] `10.13.2025` Make break circles function with removing 
- [x] `10.13.2025` Add pause button
- [x] `10.12.2025` Have timer show acutal break time when in break mode
- [x] `10.12.2025` Add back button for both websites I own
- [x] `10.11.2025` Add break timer switch
- [x] `10.10.2025` Create new public repository
- [x] `10.10.2025` Create concentric circle effect
- [x] `10.10.2025` Create mode button
- [x] `10.09.2025` Create timer circle visual
- [x] `10.09.2025` Add ability to hide timer
- [x] `10.09.2025` Create timer that counts up
- [x] `10.09.2025` Create Angular Boiler Plate
- [x] `10.08.2025` Create Repository

### Unimportant Cool Features

Build Backend
- [ ] Create backend boiler plate backend .NET
- [ ] Set up render backend for the API calls
- [ ] Check if the user has paid
- [ ] Connect it to Supabase

Patreon integration
- [ ] Show username when signed in with patreon
- [ ] Store if user is paying or not paying
- [ ] Use Supabase database to store seconds user currently has every 30 seconds
- [ ] Create Patreon integration to fetch that data
- [ ] Create selector to choose the most up to date time for the user
- [ ] Have it sync data from patreon account (paid member)

Patreon Skins
- [ ] Create patreon timer skins (background, timer, text, etc)
- [ ] Create modal to select theme the user wants to use
- [ ] Add visual skins with Patreon integration (paid member)
- [ ] Save paused, break mode, chosen color, patreon data all in the local memory

Icons
- [ ] Fix icons not appearing in obsidian.md

Improve window size
- [ ] Auto format everything to fit the window better
    - [ ] When squishing up show the timer and circle very small
    - [ ] Reformat page for when fully zoomed in / zoomed out

Animations
- [ ] Have starting from zero circle animation on reload / initial load

Start recording
- [ ] **Move project to Ionic for Mobile**
- [ ] Create text logo
- [ ] Create app icon
- [ ] Fully rework desktop layout for mobile first

  - Mobile should look exactly like desktop does in mobile mode
- [ ] Publish mobile app in beta
- [ ] **Mobile Release**
- [ ] Create "live" lockscreen widget that shows current time working
- [ ] Create dynamic island integration
- [ ] Every 6 hours send notification asking if the user is still there.

- [ ] Implement 3js as the timer
- [ ] Create apple watch app (in a different repo)
- [ ] Create break time split algorithm 

  - Algorithm that automatically slowly decreases break time per hour worked (start 2:1 end at 5:1)
- [ ] Create a coins mechanic
- [ ] Add exp mechanic
- [ ] Create some kind of pet system
    - [ ] Pets are gotten from a Crossy Road like Prize Machine
    - [ ] Include leveling up / evolving pets with "coins"
    - [ ] Include a shiny mechanic 1/8000 chance

