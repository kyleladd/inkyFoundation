(function($) {
    //http://stefangabos.ro/jquery/jquery-plugin-boilerplate-revisited/
    $.inkyFoundation = function(element, options) {

        var defaults = {
            foo: 'bar',
            onFoo: function() {}
        }

        var plugin = this;

        plugin.settings = {}

        var $element = $(element),
             element = element,
             $clone = $(element).clone();

        plugin.init = function() {
            plugin.settings = $.extend({}, defaults, options);
            foo_private_method();
        }


        plugin.convert_to_inky = function() {
            $clone.find(".columns").replaceTag("<columns>",true);
            $clone.find(".columns").removeClass("columns");
            $clone.find(".column").replaceTag("<columns>",true);
            $clone.find(".column").removeClass("column");
            $clone.find(".row").replaceTag("<row>",true);
            $clone.find(".row").removeClass("row");
            $clone.find("br").replaceTag("<spacer size=\"16\">",true);

            $clone.find('*[class*="small-"],*[class*="large-"]').each(function(index,element){
                var self = this;
                var class_list = $(self).attr('class').split(/\s+/);
                var matched_classes = class_list.filter(function(css_class){
                    var patt = /^(small|large)-\d+$/;
                    var res = patt.test(css_class);
                    return res;
                });
                matched_classes.forEach(function(css_class){
                    var split_string = css_class.split("-");
                    $(self).attr(split_string[0],split_string[1]);
                    $(self).removeClass(css_class);
                });
            });

            $clone.find('*[class=""]').removeAttr('class');
            return $clone.wrapAll("<div>").parent().html();
        }

        var foo_private_method = function() {
        }

        plugin.init();

    }

    $.fn.inkyFoundation = function(options) {

        return this.each(function() {
            if (undefined == $(this).data('inkyFoundation')) {
                var plugin = new $.inkyFoundation(this, options);
                $(this).data('inkyFoundation', plugin);
            }
        });

    }

    // https://stackoverflow.com/a/20469901/2000485
    $.extend({
        replaceTag: function (currentElem, newTagObj, keepProps) {
            var $currentElem = $(currentElem);
            var i, $newTag = $(newTagObj).clone();
            if (keepProps) {
                newTag = $newTag[0];
                $(newTag).attr("class", $currentElem.attr("class"));
                var attributes = $currentElem.prop("attributes");
                $.each(attributes, function() {
                    $(newTag).attr(this.name, this.value);
                });
            }
            $currentElem.wrapAll($newTag);
            // Handle empty elements - current element was within converted element when there wasn't anything to unwrap
            if($currentElem.contents().length > 0){
                $currentElem.contents().unwrap();
            }
            else{
                $currentElem.remove();
            }
            
            return this;
        }
    });

    $.fn.extend({
        replaceTag: function (newTagObj, keepProps) {
            return this.each(function() {
                jQuery.replaceTag(this, newTagObj, keepProps);
            });
        }
    });

})(jQuery);