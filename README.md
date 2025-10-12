
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

### To Do
- [ ] Make timer circle continue to circle around at one hour
- [ ] Add break timer switch
- [ ] Store the users break data
- [ ] Create Patreon integration
- [ ] Add visual skins with Patreon integration

- [ ] **Move project to Ionic for Mobile**

- [ ] Create a coins mechanic
- [ ] Create some kind of pet system
    - [ ] Pets are gotten from a Crossy Road like Prize Machine
    - [ ] Include leveling up / evolving pets with "coins"
    - [ ] Include a shiny mechanic 1/8000 chance

- [ ] **Full Mobile Release**

### To Do : Complete
- [X] Create Angular Boiler Plate
- [X] Create timer that counts up
- [X] Create and link clock to timer
- [ ] Implement 3js as the timer

### Building
**Normally**
```
npm i
ng serve
```
**On Website**
Run inside `Gomodoro-src`
```
ng build --base-href="/Gomodoro/" --output-path=../Gomodoro
```