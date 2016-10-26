'use strict';

angular.module('polls')
    .controller('PollListCtrl', ['$scope', '$http', 'Poll', function($scope, $http, Poll){
        $scope.polls = Poll.query();
    }])
    .controller('PollItemCtrl', ['$scope', '$stateParams', 'Poll', 'socket', function($scope, $stateParams, Poll, socket){
        $scope.poll = Poll.get({pollId: $stateParams.pollId});
        socket.on('myvote', function(data) {
            console.dir(data);
            if(data._id === $stateParams.pollId) {
              $scope.poll = data;
            }
          });
          socket.on('vote', function(data) {
            console.dir(data);
            if(data._id === $stateParams.pollId) {
              $scope.poll.choices = data.choices;
              $scope.poll.totalVotes = data.totalVotes;
            }   
          });
          $scope.vote = function() {
            var pollId = $scope.poll._id,
                choiceId = $scope.poll.userVote;
            if(choiceId) {
              var voteObj = { poll_id: pollId, choice: choiceId };
              socket.emit('send:vote', voteObj);
            } else {
              alert('You must select an option to vote for');
            }
          };
    }])
    .controller('PollNewCtrl', ['$scope', '$location', 'Poll', function($scope, $location, Poll){
        $scope.poll = {
            question: '',
            choices: [{ text: '' }, { text: '' }]
        };
        
        $scope.addChoice = function() {
            $scope.poll.choices.push({ text: '' });
        };
        $scope.removeChoice = function() {
            if($scope.poll.choices.length > 1){
                $scope.poll.choices.pop();
            } else {
                alert("Không xóa được đâu đừng cố");
            }
        };
        
        $scope.createPoll = function() {
            var poll = $scope.poll;
            if(poll.question.length > 0) {
                var choiceCount = 0;
                for(var i = 0; i < poll.choices.length; i++) {
                    var choice = poll.choices[i];        
                    if(choice.text.length > 0) {
                      choiceCount++
                    }
                }
                if(choiceCount > 1) {
                    var newPoll = new Poll(poll);
                    newPoll.$save(function(p, resp) {
                      if(!p.error) { 
                        $location.path('polls');
                      } else {
                        alert('Could not create poll');
                      }
                    });
                } else {
                alert('You must enter at least two choices');
              }
            } else {
                alert('You must enter a question');
            }
        };
    }]);