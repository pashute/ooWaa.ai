**Version:** 1.1.0  
**Last Updated:** 2026-03-17

# humANDai Planned Features

## General instructions
- [ ] All buttons are icon buttons
   - [ ] Choose icon
   - [ ] Choose hover-text
   - [ ] Confirm understanding of action

- # ooWaa.ai UI Layout and Functionality

- [ ] page layout

- [ ] leftcol   - collapsible control bar
- [ ] maincol:  Where everything happens
    - [ ] top       - app control-bar
    - [ ] app-pane  - app panel
    - [ ] bot       - status bar   // We may consider moving to bottom of both cols

## App control bar
- [ ] top div:  
  - [ ] topleft: (hamburger when leftcol collapseed)  Logo, app name and moto.  
  - [ ] topmid-left:  Navigation:  
  - [ ] topmid-right: App Control  icon buttons:  + (new chat)  _(...) (chats)   [|]/[] (split/single)
  - [ ] topright:  User:  alerts, avatar-login-profile

#### Logo app name and moto
- [ ] Logo:  ooWaa.ai  - image in a special font  
- [ ] Moto:  The AI that knows what it doesn't and teams up with you to find out
- [ ] Hover:  Objective Observant Workflow Aligned Automation


## App panel
- [ ] app-pane div:
    - [ ] app-panel-top    - current (linkable) breadcrumb 
    - [ ] app-panel-main  - current view(s)

### Views in app panel
- [ ] discussion-view
- [ ] flow-info view:  (filter, search)  current items / all items / item 
Note: domains, suggested upcoming, 
- [ ] comprehension view:  ( filter, search) kg / cloud / text

- [ ] discussion-view
  - [ ] discussion-flow-col - 25%
  - [ ] chat-col            - 25%
  - [ ] more-col             -50%

- [ ] info view:  
  - [ ]  info-top:  filter, search,  info ctrl. 
  - [ ]  info-main:
      - [ ] items page view - top = filter, search, toggle current/all
      - [ ]  item view          - top = item title, search (back to items page)

# View details:  

## Control bar

- [ ] leftcol: collapsible control bar, 
Notes:  with hamburger.  when shown maincol hamburger removed. 

## Discussion view

- [ ] discussion-view
  - [ ] discussion-flow-col
  - [ ] chat-col   
  - [ ] more-col

#### Notes:   
- top right of each:  icon toggle full screen (in full-screen toggles to back)  
- these columns have an anchor to drag a resize column width  

## Discussion-Flow  column

- [ ] discussion-flow view:  history tree., current,  upcoming tree  

Notes: 
- Toggles between tree view and Last/first 3 widget. 
- History defaults to show last subject with last 3 topics. 
- Current shows hierarchy:  subject / topic / section
- Upcoming defaults to show first 3 topics. with collapsed sections if any.

- Tree3 widget: 
- [ ] +/- toggle button for more / less. 
- [ ] toggles between:  collapsed / default (tree3)  / open all
- [ ] Clicking on subjects [+] - opens all topics under. 
- [ ] Clicking on topic [+] - opens sections. 
- [ ] Clicking on item 
- opens it in the chat view  (text timestamp in full mode, item in summary mode) 
- sets the info page to that item. 

### Chat column

- [ ]  chat view:   summary mode / full mode 
Summary mode, headlines list each with topic and headlines of resolutions. 
empty line between topics. 
Hovering over headline brings source in popup. 
double click on popup text brings that chat in full mode. 

Full mode has timestamp.  and topic text listed. 
double click on topic takes to summary mode with that topic. 



- [ ] info view:  (filter, search)  current items / all items / item 
- [ ] comprehension view:  kg / cloud / text

item view    shows single chosen item in screen
- [ ] tab for each open item   Has Copy icon button that copies to clipboard.
- [ ] supported:  doc/pdf, schematic/svg/img,  media: audio/video,  link (preview)


status bar
- [ ] bottom div: expanding status
