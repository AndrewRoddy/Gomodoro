
# Gomodoro
Pomodoro timer using the flowtime technique to automatically calculate break times.

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

## To Do

Important Bugs

Improve user experience :)
- [ ] User can choose to have it show circles or not by clicking on them
- [ ] Add notification that says your break time is up
- [ ] Create image logo (.favicon) (Probably a 3/4 complete circle)

User setting imporovements
- [ ] Create settings menu 
    - [ ] User can change break time split (2:1, 3:1, 4:1, 5:1)
    - [ ] User can choose for it to show real time left or break time left

Visual improvements
- [ ] Have animation when you reload the page similair to how it loads on reload for the first few circles

Patreon integration
- [ ] Create Patreon integration
- [ ] Add visual skins with Patreon integration


- [ ] **Move project to Ionic for Mobile**
- [ ] Create text logo
- [ ] Create app icon
- [ ] Publish mobile app in beta

- [ ] Create a coins mechanic
- [ ] Add exp mechanic
- [ ] Create some kind of pet system
    - [ ] Pets are gotten from a Crossy Road like Prize Machine
    - [ ] Include leveling up / evolving pets with "coins"
    - [ ] Include a shiny mechanic 1/8000 chance

- [ ] **Full Mobile Release**
- [ ] Create "live" lockscreen widget that shows current time working
- [ ] Implement 3js as the timer
- [ ] Create break time split algorithm 
    - Algorithm that automatically slowly decreases break time per hour worked (start 2:1 end at 5:1)

- [ ] Create apple watch app (in a different repo)

### To Do : Complete
- [X] `10.15.2025` Fix bug where if the program loses focus it stops counting up
- [X] `10.14.2025` Saving data also saves circles state
- [X] `10.13.2025` Custom pause and play SVG's instead of text
- [X] `10.13.2025` Store the users break data
- [X] `10.13.2025` Make break circles function with removing 
- [X] `10.13.2025` Add pause button
- [X] `10.12.2025` Have timer show acutal break time when in break mode
- [X] `10.12.2025` Add back button for both websites I own
- [X] `10.11.2025` Add break timer switch
- [X] `10.10.2025` Create new public repository
- [X] `10.10.2025` Create concentric circle effect
- [X] `10.10.2025` Create mode button
- [X] `10.09.2025` Create timer circle visual
- [X] `10.09.2025` Add ability to hide timer
- [X] `10.09.2025` Create timer that counts up
- [X] `10.09.2025` Create Angular Boiler Plate
- [X] `10.08.2025` Create Repository

### Building
```
npm i
ng serve
```