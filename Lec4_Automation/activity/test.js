let allH3Tags = document.querySelectorAll(".hackdown-content h3");
console.log(allH3Tags);
let codeNames = [];
for(let i=0 ; i<allH3Tags.length ; i++){
let name = allH3Tags[i].textContent;
codeNames.push(name);
}
3
console.log(codeNames);
raven.js:55 
(3) ["C++", "Python 2.7", "Java"]
undefined
let idx;
undefined
for(let i=0 ; i<codeNames.length ; i++){
if(codeNames[i] == "C++"){
idx = i;
break;
}
}
0
console.log(idx);
raven.js:55 0
undefined
let allCodes = document.querySelectorAll(".hackdown-content .highlight");
undefined
let codediv = allCodes[idx];
undefined
console.log(codediv.textContent);
raven.js:55 #include <bits/stdc++.h>
using namespace std;


int main() {
	int n;
    cin>>n;
	int freq[101] = {};
	for(int i = 0; i < n; i++) {
        int c;
        cin >> c;
        freq[c]++;
    }

	int res = 0;
	for(int i = 0; i <= 100; i++){
         res += freq[i] / 2;
     }
	cout << res << endl;
	return 0;
}
undefined
﻿
​
