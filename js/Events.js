function keyPressed() {

    if (keyCode === ENTER) {
        // deactivate all branches
        for (var i = 0; i < brc.length; i++)  brc[i].setSleep();
        if (active_brc_index == brc.length - 1) active_brc_index = 0; // go back to the first index of branches
        else active_brc_index += 1; // add the index
        brc[active_brc_index].setMoveActive(); // select the branch by activating it
    }
    if (keyCode === SHIFT) {
        brc[active_brc_index].setMirror();
    }

    var position = brc[active_brc_index].pos.copy();
    var angle = brc[active_brc_index].rot;

    if (keyCode === LEFT_ARROW) {
        if (keyIsDown(CONTROL)) angle -= 0.1 * PI; // change angle if Ctrl is pressed
        else position.add(-10, 0); // change position
    } else if (keyCode === RIGHT_ARROW) {
        if (keyIsDown(CONTROL)) angle += 0.1 * PI; // change angle if Ctrl is pressed
        else position.add(10, 0); // change position
    }
    else if (keyCode === UP_ARROW) {
        position.add(0, -10); // go up. Note that the value is mirrored due to the origin is top left corner.
    }
    else if (keyCode === DOWN_ARROW) {
        position.add(0, 10); // go down
    }

    brc[active_brc_index].setPosition(position.x, position.y);
    brc[active_brc_index].setAngle(angle); // in radians
    score.updateScore();
}

// selection of branches
function mousePressed(event) {
}

// move and rotate 
function mouseDragged(event) {
}

// deactivate the selected branch
function mouseReleased() {
}

function checkCloseBranch() {
    var closeBranch = false;
    var closeIndex = null;
    var minDragDist = 20; // 
    var minDist = minDragDist;
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