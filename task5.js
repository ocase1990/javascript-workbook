function checkUsersValid (goodUsers) {
  return function allUsersValid (submittedUsers) {
    return submittedUsers.every(function(submit) {
    	return goodUsers.some(function(good) {
    		return good.id === submit.id;
    	});
    });
  };
}

    module.exports = checkUsersValid
