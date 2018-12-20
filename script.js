$(function() {
    $('#searchButton').on('click', function(foo) {
        foo.preventDefault();
        $('#GithubApiData').html('<div id="loader"><img src="Giphy.gif" alt="loading..."></div>');


        var username = $("#username").val();
        var userAPI = 'https://api.github.com/users/' + username;
        var userAPIRepo = 'https://api.github.com/users/' + username + '/repos';


        requestJSON(userAPI, function(json) {
            // Om inte användaren hittas
            if (json.message == 'Not Found' || username == '') {
                $('#GithubApiData').html('<h5 class="card-title">Kunde inte hitta någon användare</h2>');

            } else {
                // Om users hittas så visa lite detaljer 

                var fullname = json.name;
                var username = json.login;
                var avatar = json.avatar_url;
                var profileUrl = json.html_url;
                var numOfRepos = json.public_repos;

                //Kan lägga till location
                // var location = json.location;
                /*if (location == undefined) {
                                locaction = username;
                            }*/
                
                
                    if (fullname == undefined) {
                    fullname = username;
                }
               

                var outhtml = '<h5 class = "card-title">' + fullname + ' <span class="smallname">(<a href="' + profileUrl + '" target="_blank">' + username + '</a>)</span></h2>';
                outhtml = outhtml + '<div class="ghcontent"><div class="avi"><a href="' + profileUrl + '" target="_blank"><img src="' + avatar + '" class="img-thumbnail" width="100" height="100" alt="' + username + '"></a></div>';
                //outhtml = outhtml + '<br>Based in: ' + location + '</p></div>';
                outhtml = outhtml + '<br>Repos: ' + numOfRepos + '</p></div>';
                outhtml = outhtml + '<div class="repolist clearfix">';

                var repositories;
                $.getJSON(userAPIRepo, function (json) {
                    repositories = json;
                    outputPageContent(); 
                });

                function outputPageContent() {
                    if (repositories.length == 0) {
                        outhtml = outhtml + '<p>Inga repos!</p></div>';
                    } else {
                        outhtml = outhtml + '<p><strong>Repos:</strong></p> <ul>';
                        $.each(repositories, function (index) {
                            outhtml = outhtml + '<li><a href="' + repositories[index].html_url + '" target="_blank">' + repositories[index].name + '</a></li>';
                        });
                        outhtml = outhtml + '</ul></div>';    
                    }    
                    $('#GithubApiData').html(outhtml);
                } //avslutar outPageContent
            } //avslutar else statement
        }); //avslutar reqJson Ajax call
    }); //avslutar click eventet 
});
        
        function requestJSON(url, callback) {
            $.ajax({
                url: url,
                complete: function (xhr) {
                    callback.call(null, xhr.responseJSON);
                }
            });
        }