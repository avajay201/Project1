from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views import View
# import img2pdf
# from PIL import Image
# import os, shutil
# from django.core.files.storage import FileSystemStorage
from django.conf import settings
# from django.utils.encoding import smart_str
# from django.views.static import serve
# from fpdf import FPDF
from django.contrib.auth.models import User
from django.contrib.auth import login, logout, authenticate
from django.core.mail import send_mail
import random

def otp():
    return f'{random.randint(0, 9)}{random.randint(0, 9)}{random.randint(0, 9)}{random.randint(0, 9)}{random.randint(0, 9)}{random.randint(0, 9)}'

def send_email(customer_email, name):
    try:
        subject = 'Password Reset'
        message = f'Hi {name}, Your password reset OTP - {otp()}.'
        email_from = settings.EMAIL_HOST_USER
        recipient_list = [customer_email]
        send_mail(subject, message, email_from, recipient_list)
        return True
    except Exception as err:
        return False

class Index(View):
    def get(self, request):
        return render(request, 'App1/tools.html')

class Sign_Up(View):    
    def post(self, request):
        username = request.POST.get('username')
        fname = request.POST.get('fname')
        lname = request.POST.get('lname')
        gmail = request.POST.get('gmail')
        password = request.POST.get('password')
        # if send_email(gmail, f'{fname + lname}'):
        try:
            user = User.objects.get(username = username)
            response = {
                    'error': 'Entered username already exists. Please try different username.'
            }
            return JsonResponse(response)
        except Exception as e:
            new_user = User.objects.create_user(username, gmail, password)
            new_user.first_name = fname
            new_user.last_name = lname
            new_user.save()
            response = {
                'success': 'Your account successfully created.'
            }
            return JsonResponse(response)
        # else:
        #     response = {
        #             'errro': 'Please enter valid email address.'
        #         }
        #     return JsonResponse(response)

class Sign_In(View):
    def post(self, request):
        username = request.POST.get('username')
        password = request.POST.get('password')
        try:
            user = authenticate(username=username, password=password)
            if user:
                login(request, user)
                response = {
                    'success': 'Sign in successfully.'
                }
            else:
                response = {
                    'error': 'Please enter correct username or password.'
                }
            return JsonResponse(response)
        except Exception as e:
            print('The error -', e)
            response = {
                'error': 'Please try again.'
            }
        return JsonResponse(response)

class Forget_Password(View):
    def post(self, request):
        email = request.POST.get('email')
        user = User.objects.filter(email = email).first()
        if user:
            send_email(email, f'{user.first_name} {user.last_name}')
            response = {
                'success': 'Done'
            }
        else:
            response = {
                'error': 'Not Done'
            }
        return JsonResponse(response)


# class Tools(View):
#     def get(self, request):
#         return render(request, 'App1/tools.html')

# class Jpg2Pdf(View):
#     def post(self, request):
#         uploaded_image = request.FILES['image']
#         fss = FileSystemStorage()
#         uploaded_image_path = fss.save(f'images/{uploaded_image.name}', uploaded_image)
#         image_path = os.path.join(settings.MEDIA_ROOT, f'{uploaded_image_path}')
#         pdf_name = uploaded_image.name.split('.')[0]
#         pdf = FPDF()
#         pdf.add_page()
#         pdf.image(image_path)
#         pdf_path = settings.MEDIA_ROOT + '\\pdf' + '\\' + pdf_name + '.pdf'
#         print(pdf_path,', ++++++')
#         pdf.output(pdf_path, "F")
#         return serve(request, os.path.basename(pdf_path), os.path.dirname(pdf_path))

#     def get(self, request):
#         exists_path_pdf = os.path.join(settings.MEDIA_ROOT, 'pdf')
#         exists_path_image = os.path.join(settings.MEDIA_ROOT, 'images')
#         if os.path.exists(exists_path_pdf):
#             shutil.rmtree(exists_path_pdf)
#         if os.path.exists(exists_path_image):
#             shutil.rmtree(exists_path_image)
#         return render(request, 'App1/tools/jpg2pdf.html')

# class Pdf2Jpg(View):
#     def get(self, request):
#         return render(request, 'App1/tools/pdf2jpg.html')

# class Doc2Pdf(View):
#     def get(self, request):
#         return render(request, 'App1/tools/doc2pdf.html')

# class Pdf2Doc(View):
#     def get(self, request):
#         return render(request, 'App1/tools/pdf2doc.html')

# class PdfMerge(View):
#     def get(self, request):
#         return render(request, 'App1/tools/pdf-merge.html')

# class CompressFile(View):
#     def get(self, request):
#         return render(request, 'App1/tools/compress-file.html')

# class SplitPdf(View):
#     def get(self, request):
#         return render(request, 'App1/tools/split-pdf.html')

# class Powerpoint2Pdf(View):
#     def get(self, request):
#         return render(request, 'App1/tools/powerpoint2pdf.html')

# class Pdf2Powerpoint(View):
#     def get(self, request):
#         return render(request, 'App1/tools/pdf2powerpoint.html')

# class Excel2Pdf(View):
#     def get(self, request):
#         return render(request, 'App1/tools/excel2pdf.html')

# class Pdf2Excel(View):
#     def get(self, request):
#         return render(request, 'App1/tools/pdf2excel.html')

# class Html2Pdf(View):
#     def get(self, request):
#         return render(request, 'App1/tools/html2pdf.html')

# class EditPdf(View):
#     def get(self, request):
#         return render(request, 'App1/tools/edit-pdf.html')
