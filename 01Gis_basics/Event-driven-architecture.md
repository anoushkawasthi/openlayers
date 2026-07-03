## Event
A simple notification that some changes might have occured. 
suppose a new feature is added so -> vector source updated -> emits event -> vector layer receives event and notifies map -> map receives and renders everything -> canvas redrawn -> new feature added. 

# CLick Event
Mouse Click

↓

Browser

↓

Map

↓

Map checks Features

↓

Feature Found

↓

Click Event

↓

Your Callback Runs

# Pan event  

Mouse Move

↓

View Center Changes

↓

View Event

↓

Map Render

↓

New Area Drawn 
  
# Zoom Event  

Mouse Wheel 

↓

Browser Event

↓

View Changes

↓

View Emits Event

↓

Map Hears Event

↓

Renderer

↓

New Zoom Displayed

  
