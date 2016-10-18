param($name)

function foo1 ($name) {
  Write-Host "hello $name"
}

function foo2($name){
  foo1 $name
}

foo2 $name
