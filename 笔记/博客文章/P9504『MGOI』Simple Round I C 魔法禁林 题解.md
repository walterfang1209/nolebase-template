---
title: P9504 『MGOI』Simple Round I | C. 魔法禁林 题解
date: 2023-08-06 19:21:10
tags: 题解
---

[原题](https://www.luogu.com.cn/problem/P9504)

## 思路/解析

笔者的思路不是很正经，但可以通过此题。思路为：宽搜+卡常。

我们使用链式前向星存储这张图，用二维数组 $f$ 保存当前步数，然后根据题意进行宽搜，这样可以通过 `Substack 1&2`。

对于 `Substack 3`：

注意到 $w\le 1$，因此答案只有可能是 $0$ 或 $1$。因此当权值 $z$ 只包含 $0$ 或 $1$ 时，我们只需要特判，当权值全为 $1$ 时，输出 $1$，否则输出 $0$。

对于 `Substack 4`：

使用快读+`register int`通过本 `Substack`。

至此，本题已 AC。

## 代码

```cpp
#include<bits/stdc++.h>
using namespace std;
const int N=4e4+10;
int n,m,st,ed,head[N],f[N][510],u,v,sx,sy,sz,fx,fy,fz,cnt,x,y,z,ma=INT_MIN,mi=INT_MAX;
struct Node{int x,y;};
queue<Node>q;
struct Edge{int to,nxt,val;}E[N<<1];
void add(int x,int y,int z){E[++cnt]={y,head[x],z};head[x]=cnt;}
namespace FastIO {
	char *p1, *p2, buf[1 << 14];
	#define getchar() (p1 == p2 && (p2 = (p1 = buf) + fread(buf, 1, (1 << 14), stdin), p1 == p2) ? EOF : *p1++)

	template <typename T>
	inline void read(T& x) {
    	x = 0;
    	register int t = 1;
    	register char ch = getchar();
    	while (ch < '0' || ch > '9') {
        	if (ch == '-')
            	t = -1;
        	ch = getchar();
    	}
    	while (ch >= '0' && ch <= '9'){
        	x = (x << 1) + (x << 3) + (ch ^ 48);
        	ch = getchar();
    	}
    	x *= t;
	}

	template <typename T>
	void write(T x) {
    	if (x < 0) {
        	putchar('-');
        	x = -x;
    	}
    	if (x > 9) write(x / 10);
    	putchar(x % 10 ^ 48);
	}
	template <typename T>
	inline void writeln(T x, char sep = '\n') {
		write(x);
		putchar(sep);
	}
}
using namespace FastIO;
int main(){
	read(n);read(m);read(st);read(ed);
	for(register int i=1;i<=m;++i){
		read(x),read(y),read(z);
		add(x,y,z),add(y,x,z),ma=(z>ma)?z:ma;
	}
	if(ma<=1){
		for(register int i=head[ed];i;i=E[i].nxt)if(!E[i].val)return cout<<0,0;
		return cout<<1,0;
	}
	q.push({ed,1});
	while(!q.empty()){
	register int u=q.front().x,fy=q.front().y,fz=f[u][fy-1];q.pop();
		if(fy>=482)break;
		for(register int i=head[u];i;i=E[i].nxt){
			register int v=E[i].to,sx=fz+E[i].val/fy,sy=fy+1;
			if(f[v][fy]<=sx&&f[v][fy])continue;
			q.push({v,sy});f[v][fy]=sx;
		}
	}
	for(register int i=0;i<=482;++i)if(f[st][i])mi=(f[st][i]<mi)?f[st][i]:mi;
	cout<<mi;
}
```