$(function() {
	'use strict';

	//変数定義エリア
		var
			cards = [],
			kind  = ["s","h","c","d"],
			cards_len,
			select_num = "",
			select_index = [],
			$li   = $("<li>"),
			$table= $("#table"),
			$img  = $("<img>");


	//処理エリア

	for(var i = 0; i < 4; i++) {
		for(var j = 1; j <= 13; j++) {
			cards.push(kind[i] + ("0" + j).slice(-2) + ".png");
		}
	}

	cards_len = cards.length;

	shuffle();

	console.log(cards);

	for(var i = 0; i < cards_len; i++) {
		$li
			.clone()
			.data("num", cards[i].replace(/[^0-9]/g, ""))
			.addClass("card is_surface")
			.append(
				$img
					.clone()
					.attr("src", "images/z02.png")
					.addClass("card_surface")
			)
			.append(
				$img
					.clone()
					.attr("src", "images/" + cards[i])
					.addClass("card_reverse")
			)
			.appendTo($table);
	}

	$table.on("click", "li", function() {
		$(this).toggleClass("is_surface").toggleClass("is_reverse");

		if(select_num === "") {
			select_num = $(this).data("num");
			console.log(select_num);
			select_index.push($(this).index());
			console.log(select_index);
		} else {
			if($(this).index() !== select_index[0]) {
				select_index.push($(this).index());
				console.log(select_index);
				if($(this).data("num") === select_num) {
					console.log("okay");
					select_num = "";
					select_index = [];
				} else {
					console.log("not good");
					select_num = "";
					select_index = [];
				}
			} else {
				select_num = "";
				select_index = [];
				console.log(select_index);
			}
		}
	});

	//関数定義エリア

	function shuffle() {

		var
			len = cards_len - 1,
			tmp,
			j;

		for(var i = len; i > 0; i--) {
			//52回文処理を繰り返す0~51までの乱数を繰り返す
			j        = Math.floor(Math.random() * (i + 1));
			tmp      = cards[i];
			cards[i] = cards[j];
			cards[j] = tmp;
		}
	}

});
