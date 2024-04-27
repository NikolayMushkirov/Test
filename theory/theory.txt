const arr = [10, 12, 15, 21];

for (var i = 0; i < arr.length; i++) {
  setTimeout(function () {
    console.log(arr[i] > 13 ? `Good: ${arr[i]} ` : `Bad: ${arr[i]}`);
  }, 1000);
}

Такой код выведет 4 раза Bad: undefined, потому что i внутри setTimeout будет равен 4 и вызов arr[i] будет равен undefined.

Чтобы исправить можно заменить ключевое слово var на let.
Переменные, объявленные с использованием let, имеют блочную область видимости, что означает, что каждая итерация цикла создает новую переменную i со своим собственным значением.

const arr = [10, 12, 15, 21];

for (let i = 0; i < arr.length; i++) {
  setTimeout(function () {
    console.log(arr[i] > 13 ? `Good: ${arr[i]} ` : `Bad: ${arr[i]}`);
  }, 1000);
}

теперь в console.log будет выводится нужный ответ
 Bad: 10, Bad: 12, Good: 15, Good: 21