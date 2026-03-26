import urllib.request
import os

urls = {
    "stitched_catalog.html": "https://contribution.usercontent.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzE3MmU3NWMwMjM4ZDRkN2FhYmY1YTk3MmY0M2VkNjhiEgsSBxDT-pux1ggYAZIBJAoKcHJvamVjdF9pZBIWQhQxMzQ0OTY2NDkyMDY5NDY4ODE1MA&filename=&opi=89354086",
    "stitched_detail.html": "https://contribution.usercontent.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sX2FkNDMzYTZhMmJhZTRlNzA4MDg1NzA3OTI1NWUxMDgyEgsSBxDT-pux1ggYAZIBJAoKcHJvamVjdF9pZBIWQhQxMzQ0OTY2NDkyMDY5NDY4ODE1MA&filename=&opi=89354086",
    "stitched_cart.html": "https://contribution.usercontent.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sX2FhZjEwZDI4ZDEwZjQwZDFiYzcxN2NkY2E3ZTljMjQxEgsSBxDT-pux1ggYAZIBJAoKcHJvamVjdF9pZBIWQhQxMzQ0OTY2NDkyMDY5NDY4ODE1MA&filename=&opi=89354086"
}

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

for filename, url in urls.items():
    print(f"Downloading {filename}...")
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req) as response:
            content = response.read().decode('utf-8')
            if content.strip() == "OK":
                print(f"Warning: {filename} still returning 'OK'")
            with open(filename, "w", encoding="utf-8") as f:
                f.write(content)
        print(f"Successfully processed {filename}")
    except Exception as e:
        print(f"Failed to download {filename}: {e}")
