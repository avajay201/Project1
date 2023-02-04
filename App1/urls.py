from django.urls import path
from . import views
from django.conf import settings #add this
from django.conf.urls.static import static

urlpatterns = [
    # path('', views.Index.as_view(), name = ''),
    path('', views.Index.as_view(), name = ''),
    path('sign_up', views.Sign_Up.as_view(), name = 'sign_up'),
    path('sign_in', views.Sign_In.as_view(), name = 'sign_in'),
    
    path('tools', views.Tools.as_view(), name = 'tools'),
    # Tools URLs =======>>>>>>>
    path('jpg-2-pdf', views.Jpg2Pdf.as_view(), name = 'jpg-2-pdf'),
    path('pdf-2-jpg', views.Pdf2Jpg.as_view(), name = 'pdf-2-jpg'),
    path('doc-2-pdf', views.Doc2Pdf.as_view(), name = 'doc-2-pdf'),
    path('pdf-2-doc', views.Pdf2Doc.as_view(), name = 'pdf-2-doc'),
    path('pdf-merge', views.PdfMerge.as_view(), name = 'pdf-merge'),
    path('compress-file', views.CompressFile.as_view(), name = 'compress-file'),
    path('split-pdf', views.SplitPdf.as_view(), name = 'split-pdf'),
    path('powerpoint-2-pdf', views.Powerpoint2Pdf.as_view(), name = 'powerpoint-2-pdf'),
    path('pdf-2-powerpoint', views.Pdf2Powerpoint.as_view(), name = 'pdf-2-powerpoint'),
    path('excel-2-pdf', views.Excel2Pdf.as_view(), name = 'excel-2-pdf'),
    path('pdf-2-excel', views.Pdf2Excel.as_view(), name = 'pdf-2-excel'),
    path('html-2-pdf', views.Html2Pdf.as_view(), name = 'html-2-pdf'),
    path('edit-pdf', views.EditPdf.as_view(), name = 'edit-pdf'),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
