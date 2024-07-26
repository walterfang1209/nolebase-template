---
title: AT_abc041_d [ABC041D] 徒競走 题解
date: 2023-08-05 16:36:20
tags: 题解
---

翻译已经非常言简意赅了，题目大意就不说了。

### 思路/解析

状压 dp。

我们用 $f_i$ 保存已经遍历过的点集为 $i$ 的方案数量，那么当要加入一个新节点 $j$ 时，节点 $j$ 的所有子节点必须全部在点集 $i$ 中。

需要注意的是，最初我们将没有点权看作第一种方案，即 $f_0=1$。

### 代码

```cpp
#include<bits/stdc++.h>
using namespace std;
typedef long long ll;
const ll N=2e5+10;
ll n,m,x,y,i,j,a[N],f[N]={1};
int main(){
	cin>>n>>m;
	for(i=1;i<=m;i++)cin>>x>>y,a[x]|=1<<y-1;
	for(i=0;i<(1<<n);i++)
		for(j=1;j<=n;j++)
			if((a[j]&i)==a[j]&&!(i>>j-1&1))
				f[i|(1<<j-1)]+=f[i];
	cout<<f[(1<<n)-1];
}
```