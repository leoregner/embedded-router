$(document).ready(function()
{
    // determines whether a URL matches a pattern and parses the URL parameters
    const urlMatchesPattern = function(url, pattern)
    {
        const variableFinder = /\:[a-zA-Z0-9_]*/g;
        let variable, index = 0, variables = [], urlRegex = '^';
        
        do if(variable = variableFinder.exec(pattern))
        {
            urlRegex += pattern.substring(index, variable.index).replace(/[-[\]{}()*+?.,\\^$|#\s\/]/g, '\\$&') + '([^\/\?]+)';
            variables.push(variable[0].substring(1));
            index = variable.index + variable[0].length;
        }
        while(variable);
        
        urlRegex += pattern.substr(index, pattern.length).replace(/[-[\]{}()*+?.,\\^$|#\s\/]/g, '\\$&') + (!pattern.endsWith('/') ? '(\\/?)' : '') + '(\\?.*)?$';
        urlRegex = new RegExp(urlRegex);
        
        if(urlRegex.test(url))
        {
            const match = urlRegex.exec(url);
            window.viewParams = {};
            window.viewGetParams = {};
            
            for(let i = 0; i < variables.length; ++i)
                window.viewParams[variables[i]] = match[i + 1];
            
            if(window.location.search.length > 1)
                for(let pair of window.location.search.substring(1).split('&'))
                    window.viewGetParams[pair.split('=')[0]] = unescape(pair.substring(pair.split('=')[0].length + 1).replace(/\+/g, '%20'));
            
            if(window.location.hash.indexOf('?') > -1)
                for(let pair of window.location.hash.substring(window.location.hash.indexOf('?') + 1).split('&'))
                    window.viewGetParams[pair.split('=')[0]] = decodeURIComponent(pair.substring(pair.split('=')[0].length + 1).replace(/\+/g, '%20'));
            
            return true;
        }
        
        else return false;
    };
    
    // DOM interaction
    const viewer = $('viewer'), loading = viewer.children('while-loading').html();
    const routes = viewer.children('view').map(function()
    {
        return {
            url: $(this).attr('href'),
            file: $(this).attr('src'),
            default: $(this).is('[default]'),
            notFoundRoute: $(this).is('[not-found]')
        };
    })
    .get();
    
    // function redirecting to the route marked as default
    const goToDefaultRoute = function()
    {
        for(let route of routes)
            if(route.default)
                window.location.hash = route.url;
    };
    
    // event handler for changed route
    window.onhashchange = function()
    {
        // find view for route and load it
        for(let route of routes)
            if(urlMatchesPattern(window.location.hash, route.url))
            {
                viewer.html(loading);
                viewer.load(route.file);
                return;
            }
        
        // if hash is set, but no matching route was found, load error route
        if(window.hash !== '')
            for(let route of routes)
                if(route.notFoundRoute)
                    return void viewer.load(route.file);
        
        // otherwise, go to default route
        goToDefaultRoute();
    };
    
    // choose route on start
    window.onhashchange();
});
