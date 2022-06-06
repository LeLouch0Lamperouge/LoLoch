<?php 
function get_data() {
  
    $connect = mysqli_connect("localhost", "root", "", "loloch");
    $query = "SELECT * FROM anime_posts ";
    $result = mysqli_query($connect, $query);
    $employee_data = array();
    while ($row = mysqli_fetch_array($result) ) {
        $employee_data [] = array (
            'id'                              =>$row ["id"],
            'anime_posts_unique_id'           =>$row ["anime_posts_unique_id"],
            'season_id'                       =>$row ["season_id"],
            'episode_id'                      =>$row ["episode_id"],
            'ftitle'                          =>$row ["ftitle"],
            'stitle'                          =>$row ["stitle"],
            'title'                           =>$row ["title"],
            'description'                     =>$row ["description"],
            'season_number'                   =>$row ["season_number"],
            'episode_number'                  =>$row ["episode_number"],
            'quality_1'                       =>$row ["quality_1"],
            'quality_2'                       =>$row ["quality_2"],
            'quality_3'                       =>$row ["quality_3"],
            'evaluate'                        =>$row ["evaluate"],
            'location'                        =>$row ["location"],
            'country'                         =>$row ["country"],
            'start_at'                        =>$row ["start_at"],
            'end_at'                          =>$row ["end_at"],
            'type_1'                          =>$row ["type_1"],
            'type_2'                          =>$row ["type_2"],
            'type_3'                          =>$row ["type_3"],
            'author'                          =>$row ["author"],
            'state'                           =>$row ["state"],
            'states'                          =>$row ["states"],
            'img'                             =>$row ["img"],
            'post_creat'                      =>$row["post_creat"]
        );
    }
            return json_encode($employee_data);
        
}

$file_name = date('d-m-Y').'.json';
if(file_put_contents($file_name, get_data())) {
    echo $file_name.'file created';
}else {
    echo 'some errors';
}

?>