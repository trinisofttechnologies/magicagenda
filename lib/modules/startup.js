/**
 * Created by lion on 10/2/2015.
 */
let startup = () => {};
app = {};
Modules.both.startup = startup;

lookup = function(obj, route){
  var local = obj;
  route = route.split(".");
  for(var i=0,il=route.length;i<il;i++){
    if(local && local[route[i]])
      local = local[route[i]];
    else
      return null;
  }
  return local;
}