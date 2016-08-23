(function () {

    angular.module('app.games').filter('mydate', myDate).filter('myrating', myRating);

    function myDate() {
        return function (date) {
            if (angular.isDefined(date)) {
                return moment(date).format('MMMM DD `YY');

            } else {
                return date;
            }
        };
    }

    function myRating() {
        return function (items, rating) {
            if (angular.isDefined(rating)) {
                rating = parseInt(rating, 10);
                items = items.filter(function (e) {
                    return (e.rating >= rating && e.rating < (rating + 1));
                });
                return items;
            } else {
                return items;
            }
        };

    }
} ());