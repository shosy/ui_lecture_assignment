User Interface Coursework
============================
Welcome to the asignment page of user interface course at the University of Tokyo. The entire course schedule is shared in the following link:
https://www-ui.is.s.u-tokyo.ac.jp/~takeo/course/2020/ui/index.html


# Assignment
## 1. Implement your own UI
As the lecture introduced assignment, we'd like you to implement basic UIs such as moving and rotating to manipulate 2D tree branches. The programming language we use here is  Javascript using p5js (Javascript version of Processing); however, it is up to you which language you use. 

The current UI is set with keyboard inputs using the function in the following link.
https://p5js.org/reference/#/p5/keyPressed 

Focusing on basic manipulations (move, rotate, and mirror), you can develop your own interaction. You can set your own goal of UI development. For example to make it intuitive, or smooth, or fun. As an example, mouse inputs can make it more intuitive than key inputs. By clicking, a user can select a branch and move/rotate by dragging. Ofcourse, you don't have to use mouse clicks! Please feel free to implemnet your own UI ideas. Your fun UI ideas are highly appreciated!


    
 

## 2. User study: Test your UI with participants
While you implement your code, you will become an expert of your UI. To validate usability, you can test the UI with your friends and families. You can first let them use your UI without any instructions to see how intuitive your UI is, and then provide more information such as how to use your UI and the aim of the UI. Please measure the duration for completing the game to see how smooth your UI is. Please summarize findings during user study including interviews. The questions of the interview could be - how intuitive was it and where did you get stuck? - Any comment for improving the UI?


# The Game

![](branchconnect.gif | width = 300)

The game interface is composed of boundary, target points, and branches.
Branches can be connected within a certain angle range and importantly one branch must be mirrored. The mirror rule came from the fabrication constraint of 3-axis CNC router. 



# Folder structure and relevant files to this assignment
The overview of the folder strucutre is as following. 
```
index.html
├── data
│    ├── br12
│         ├──plate.json
│         ...
├── js
│    ├── main.js <-- main loop of p5.js
│    ├── Events.js <-- you can modify this file to for your own interaction
│    ...
│
├── lib   
└── style
```
Within these files, you can focus on ```js/main.js and js/Events.js``` to implement your interaction. On top of that, please take a look on ```data/plate.json``` and how it is read in ```js/LibraryBranch.js```. 



## References
https://p5js.org/
https://hironoriyh.github.io/