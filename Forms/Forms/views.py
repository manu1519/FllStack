from django.shortcuts import render

def home(request):
    return render(request, 'main.html')

def results(request):
    user_input = request.GET['user_input']
    user_input = user_input.upper()
    user_input += " Some text xd"
    return render(request, 'results.html', {'home_input':user_input})