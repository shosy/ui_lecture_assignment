function keyPressed() {

    if (keyCode === ENTER) {
        // deactivate all branches
        for (var i = 0; i < brc.length; i++)  brc[i].setSleep();
        if (active_brc_index == brc.length - 1) active_brc_index = 0; // go back to the first index of branches
        else active_brc_index += 1; // add the index
        brc[active_brc_index].setMoveActive(); // select the branch by activating it
    }

    var position = brc[active_brc_index].pos.copy();
    var angle = brc[active_brc_index].rot;

    if (keyCode === LEFT_ARROW) {
        if (keyIsDown(SHIFT)) angle -= 0.1 * PI; // change angle if Shift is pressed
        else position.add(-10, 0); // change position
    } else if (keyCode === RIGHT_ARROW) {
        if (keyIsDown(SHIFT)) angle += 0.1 * PI; // change angle if Shift is pressed
        else position.add(10, 0); // change position
    }
    else if (keyCode === UP_ARROW) {
        position.add(0, -10); // go up. Note that the value is mirrored due to the origin is top left corner.
    }
    else if (keyCode === DOWN_ARROW) {
        position.add(0, 10); // go down
    }
    else if (keyIsDown(ALT)) {
        brc[active_brc_index].setMirror(); // mirror the branch if Alt is pressed
    }

    brc[active_brc_index].setPosition(position.x, position.y);
    brc[active_brc_index].setAngle(angle); // in radians
    score.updateScore();
}


var mouse_flag = false; // mousePressedによりbranchが選択されている状態

// selection of branches
function mousePressed(event) {
    /* first get clicked position by 
    console.log(event.layerX + ' , ' + event.layerY); 
    or 
    console.log(mouseX + ' , ' + mouseY);
    
    and then select
    var branch = checkCloseBranch(20)[0];
    */
    var branch = checkCloseBranch(20);
    if (branch[0]) {
        for (var i = 0; i < brc.length; i++)  brc[i].setSleep(); // deactivate all branches
        active_brc_index = branch[1]; // choose the closest branch
        brc[active_brc_index].setMoveActive(); // select the branch by activating it
        mouse_flag = true;
    }
}

// move and rotate 
function mouseDragged(event) {
    /*
    see keyPressed
    */
    if (!mouse_flag)  return;

    var position = brc[active_brc_index].pos.copy();
    var angle = brc[active_brc_index].rot;
    var mouseVec = new createVector(mouseX, mouseY);
    var moveVec = new createVector(event.movementX, event.movementY);

    if (!keyIsDown(SHIFT)) {
        position.add(moveVec); // change position
    } else {
        // var v0 = mouseVec.copy().sub(moveVec).sub(position).normalize();
        // var v1 = mouseVec.copy().sub(position).normalize();
        // angle += Math.asin(Math.min(Math.max(-1, v0.x * v1.y - v0.y * v1.x), 1)); // change angle if Shift is pressed
        var v0 = mouseVec.copy().sub(moveVec).sub(position);
        var v1 = mouseVec.copy().sub(position);
        angle += v0.angleBetween(v1); // change angle if Ctrl is pressed
    }
    
    brc[active_brc_index].setPosition(position.x, position.y);
    brc[active_brc_index].setAngle(angle); // in radians
    score.updateScore();
}

// deactivate the selected branch
function mouseReleased() {
    /*
    you might need to deselect the selected branch 
    */
    mouse_flag = false;
}

// mirror the branch
function doubleClicked(e) {
    window.blockMenuHeaderScroll = true;
    var test = checkCloseBranch(20);
    if (test[0]) {
        // console.log( test[0] + " ," + test[1]) ;
        active_brc_index = test[1];
        brc[active_brc_index].setMirror();
        brc[active_brc_index].transform();
        score.updateScore();
    }
}

function checkCloseBranch(minDist) {
    var closeBranch = false;
    var closeIndex = null;
    var mouseVec = new createVector(mouseX, mouseY);
    for (var i = 0; i < brc.length; i++) {
        var vertices = brc[i].transformed_contour;
        for (var j = 0; j < vertices.length; j++) {
            var distance = mouseVec.dist(vertices[j]);
            if (distance < minDist) {
                closeBranch = true;
                minDist = distance;
                closeIndex = i;
            }
        }
    }
    return [closeBranch, closeIndex];
}

// save canvas
function OnButtonClick_save(event) {
    saveCanvas('canvas.png', 'png');
}

// show the best score
function OnButtonClick_bestscore(event) {
    try {
        var bestbrc = JSON.parse(localStorage.getItem("best_brc"));
        brc.forEach(function(branch, index) {
            var bestbranch = bestbrc[index];
            brc[index].setPosition(bestbranch.pos.x, bestbranch.pos.y);
            brc[index].setAngle(bestbranch.rot); // in radians
            brc[index].mirror = bestbranch.mirror;
            brc[index].transform();
        });
    } catch(e) {
        OnButtonClick_bestscore(event);
    }
    score.updateScore();
}
