<?php
    //will contain utility functions to help in implementing primary, archive, bin page
    // require_once "./../../helpers/config.php";

    //function to fetch notes from database
    function fetchNotes($limit, $offset, $is_pinned, $is_archived, $is_binned)
    {
        //declaring link variable here
        global $link;
        
        //query string
        $sql = "select * from user_notes where user_id=? and is_pinned=? and is_binned=? and is_archived=? order by insert_time desc limit ? offset ?;";

        //prepare statement
        $stmt = mysqli_prepare($link, $sql);

        //bind parameters
        mysqli_stmt_bind_param($stmt, "iiiiii", $param_user_id, $param_pinned, $param_binned, $param_archived, $param_limit, $param_offset);

        //set parameters
        $param_user_id = $_SESSION["user_id"];
        $param_limit = $limit;
        $param_offset = $offset;
        $param_pinned = $is_pinned;
        $param_binned = $is_binned;
        $param_archived = $is_archived;

        //execute
        mysqli_execute($stmt);

        //getting result
        $result = mysqli_stmt_get_result($stmt);

        //getting result as array of notes
        $notesArr = mysqli_fetch_all($result, MYSQLI_ASSOC);

        //return the array of notes
        return $notesArr;
    }

    //function to update a note (its is_binned, is_pinned, is_archived flags and the insert_time)
    function updateNote($note_id, $is_pinned, $is_archived, $is_binned)
    {
        //declaring global link here
        global $link;

        //query string
        $sql = "update user_notes set is_pinned=?, is_archived=?, is_binned=? where note_id=? and user_id=?;";

        //prepare statement
        $stmt = mysqli_prepare($link, $sql);

        //bind parameters
        mysqli_stmt_bind_param($stmt, "iiiii", $param_is_pinned, $param_is_archived, $param_is_binned, $param_note_id, $param_user_id);

        //set parameters
        $param_is_pinned = $is_pinned;
        $param_is_archived = $is_archived;
        $param_is_binned = $is_binned;
        $param_note_id = $note_id;
        $param_user_id = $_SESSION["user_id"];

        echo $is_pinned.$is_archived.$is_binned;

        //execute
        mysqli_execute($stmt);
        // echo "oye";
    }

?>