from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.core.files.storage import FileSystemStorage
import csv


def index(request):
    return render(request, 'index.html')

def CatalogueMaintenancePage(request):
    return render(request, 'CatalogueMaintenancePage.html')


@csrf_exempt
def catalogAction(request):
    titles = request.POST['title']
    categorys = request.POST['cateogry']
    artists = request.POST['artist']
    publishers = request.POST['publisher']
    prices = request.POST['price']
    quantitys = request.POST['quantity']
    photo = request.FILES['image']
    fs = FileSystemStorage()
    filename = fs.save(photo.name, photo)
    file = open("books.txt", "r")
    data1 = csv.reader(file)
    p = []
    for i in data1:
        p.append(i[0])
    counter = int(p[len(p) - 1]) + 1
    file = open("books.txt", "a")
    file.write(str(counter).upper() + "," + str(titles).upper() + "," + str(categorys).upper() + "," + str(artists).upper() + "," + str(
        publishers).upper() + "," + str(prices) + "," + str(quantitys) + "," + str(filename).upper() + "\n")
    return HttpResponse("Success Full inserted")


def viewCatalogAction(request):
    f = open("books.txt", 'r')
    result = []
    read = csv.reader(f)
    for i in read:
        result.append(i)
    lst = []
    for i in result:
        dic = {}
        dic['id'] = i[0]
        dic['title'] = i[1]
        dic['cateogry'] = i[2]
        dic['artist'] = i[3]
        dic['publisher'] = i[4]
        dic['price'] = i[5]
        dic['quantity'] = i[6]
        dic['img'] = i[7]
        lst.append(dic)
    return JsonResponse(lst, safe=False)


def deletecate(request):
    id = request.GET["id"]
    deletedata = []
    file = open("books.txt", 'r')
    data = csv.reader(file)
    for i in data:
        deletedata.append(i)
    for j in range(0, len(deletedata)):
        if deletedata[j][0] == str(id):
            deletedata.pop(j)
            break
    file1 = open("books.txt", 'w')
    file1.truncate(0)
    for i in deletedata:
        file1.write(str(i[0]) + "," + str(i[1]).upper() + "," + str(i[2]).upper() + "," + str(i[3]).upper() + "," + str(i[4]).upper() + "," + str(
            i[5]) + "," + str(i[6]) + "," + str(i[7]).upper() + "\n")
    return HttpResponse("Deleted sucessfull")


@csrf_exempt
def updatedataaction(request):
    id = request.POST['ISBN']
    title = request.POST['title']
    category = request.POST['category']
    artist = request.POST['artist']
    publisher = request.POST['publisher']
    price = request.POST['price']
    quantity = request.POST['quantity']
    photo = request.FILES['imgedit']
    fs = FileSystemStorage()
    filename = fs.save(photo.name, photo)
    deletedata = []
    file = open("books.txt", 'r')
    data = csv.reader(file)
    for i in data:
        deletedata.append(i)
    for j in range(0, len(deletedata)):
        if deletedata[j][0] == str(id):
            deletedata[j].clear()
            deletedata[j].extend([id, title.upper(), category.upper(), artist.upper(), publisher.upper(), price.upper(), quantity.upper(), filename.upper()])
            break
    file1 = open("books.txt", 'w')
    file1.truncate(0)
    for i in deletedata:
        file1.write(str(i[0]) + "," + str(i[1]).upper() + "," + str(i[2]).upper() + "," + str(i[3]).upper() + "," + str(i[4]).upper() + "," + str(
            i[5]) + "," + str(i[6]) + "," + str(i[7]).upper() + "\n")
    return HttpResponse("Sucessfully Update")


# Catalogue Maintenance Page Work End

# catalogue searchpage
def cataloguesearchpage(request):
    return render(request, 'catalogueSearch.html')


def searchresult(request):
    return render(request, 'cataloguesearchresult.html')


# end of catalogue searchpage
def searchResultActionPage(request):
    searchdata = request.GET['search']
    if searchdata == "":
        f = open("books.txt", 'r')
        result = []
        read = csv.reader(f)
        for i in read:
            result.append(i)
    else:
        file = open("books.txt", 'r')
        result=[]
        data = csv.reader(file)
        for listData in data:
            if listData[2] == str(searchdata).upper() or listData[4] == str(searchdata).upper():
                result.append(listData)
    li = []
    if len(result)==0:
        dct = {}
        dct['nodata'] = "No Data Found"
        li.append(dct)
    for row in result:
        dct = {}
        dct["id"] = row[0]
        dct["title"] = row[1]
        dct["category"] = row[2]
        dct["author"] = row[3]
        dct["publisher"] = row[4]
        dct["price"] = row[5]
        dct["quantity"] = int(row[6])
        dct["image"] = row[7]
        li.append(dct)
    return render(request, "cataloguesearchresult.html", {"data": li,"number":len(li)})


def sitemapepage(request):
    return render(request, "sitemap.html")
